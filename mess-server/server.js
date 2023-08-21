const express = require("express");
var cors = require("cors");

const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

const knex = require("knex")(require("./knexfile")[process.env.NODE_ENV || "development"]);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/users", function (req, res) {
  knex.select().table("users").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

// Retrieves all pinned articles
app.get("/pinned-articles", function (req, res) {
  knex.select().table("pinned_articles")
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send(err));
});

app.post("/pin-article/:articleId", function (req, res) {
  const { articleId, slug, title, content } = req.body;

  knex('pinned_articles').insert({ article_id: articleId, slug: slug, title: title, content: content })
    .then(() => {
      res.json({
        success: true, 
        message: "Pinned successfully"
      });
    })
    .catch(err => {
      console.error("Error pinning article:", err);
      res.status(500).send(err);
    });
});

// Unpins an article
app.delete("/unpin-article/:articleId", function (req, res) {
  const articleId = req.params.articleId;
  console.log(articleId)

  knex('pinned_articles').where({ article_id: articleId }).del()
  .then(() => res.json({success: true, message: "Unpinned successfully"}))
  .catch(err => res.status(400).send(err));
});

// Retrieves bases
app.get("/bases", function (req, res) {
  knex.select().table("military_bases").orderBy("base_id", "asc").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

app.get("/alone-goals", function (req, res) {
  knex.select().table("goals").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

app.get("/alone-goal", function (req, res) {
  knex.select().table("program_goals").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

// Get all testing centers
app.get("/testing-centers", function (req, res) {
  knex.select().table("testing_centers").orderBy("name", "asc").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

// Retrieves testing centers based on baseId
app.get("/bases/:id", (req, res) => {
  const baseId = req.params.id;

  if (! baseId) {
    return res.status(400).send("baseId is required.");
  }

  knex("testing_centers").where("base_id", baseId).orderBy("center_id", "asc").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

app.get("/semester_terms", function (req, res) {
  knex.select().table("semester_terms").then((response) => res.status(200).json(response)).catch((err) => res.status(404).send(err));
});

// Handle Goal Functions
async function handleDegreeGoal(goalId) {
  const degreeGoal = await knex("goals").where("goals.goal_id", goalId).leftJoin("degree_goals", "goals.goal_id", "degree_goals.goal_id").first();

  const courses = await knex("courses").where("reference_id", degreeGoal.reference_id);
  let totalCredits = 0;
  let totalGradePoints = 0;

  const fetchedCourses = await Promise.all(courses.map(async (course) => {
    if (course.status === "Complete") {
      totalCredits += course.credits;
    }
    const [grade, semesterTerm] = await Promise.all([
      knex("grades").where("grade_id", course.grade_id).first(),
      knex("semester_terms").where("term_id", course.term_id).first(),
    ]);

    if (course.status === "Complete") {
      totalGradePoints += grade.grade_point * course.credits;
    }

    course.grade = grade.grade_value;
    course.semester_term = semesterTerm.term_name;
    course.start_date = semesterTerm.start_date;
    course.end_date = semesterTerm.end_date;

    const {
      reference_id,
      term_id,
      grade_id,
      ...desiredCourse
    } = course;
    return desiredCourse;
  }));

  const gpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  degreeGoal.courses = fetchedCourses;
  degreeGoal.completed_credits = totalCredits;
  degreeGoal.gpa = gpa;
  const {
    ...desiredDegreeGoal
  } = degreeGoal;

  return desiredDegreeGoal;
}
async function handleProgramGoal(goalId) {
  const programGoal = await knex("goals").where("goals.goal_id", goalId).leftJoin("program_goals", "goals.goal_id", "program_goals.goal_id").first();

  const modules = await knex("modules").where("reference_id", programGoal.reference_id);
  const formattedModules = modules.map((module) => ({module_id: module.module_id, title: module.title, status: module.status}));
  const completedModulesCount = formattedModules.filter((module) => module.status === "Complete").length;

  return {
    goal_id: programGoal.goal_id,
    goal_type_id: programGoal.goal_type_id,
    reference_id: programGoal.reference_id,
    title: programGoal.title,
    program_status: programGoal.program_status,
    online: programGoal.online,
    total_modules: formattedModules.length,
    completed_modules: completedModulesCount,
    start_date: programGoal.start_date,
    end_date: programGoal.end_date,
    city: programGoal.city,
    state: programGoal.state,
    country: programGoal.country,
    modules: formattedModules
  };
}

async function handleCertGoal(goalId) {
  const certGoal = await knex("goals").where("goals.goal_id", goalId).leftJoin("cert_goals", "goals.goal_id", "cert_goals.goal_id").leftJoin("certifications", "cert_goals.cert_id", "certifications.cert_id").first();

  const [exams, resources] = await Promise.all([
    knex("cert_exams").leftJoin("cert_exam_status", "cert_exams.cert_exam_id", "cert_exam_status.cert_exam_id").where("cert_exams.cert_id", certGoal.cert_id),
    knex("cert_study_resources").where("cert_id", certGoal.cert_id),
  ]);

  const {
    cert_id,
    ...formattedGoal
  } = certGoal;

  formattedGoal.exams = exams.map(({
    cert_status_id,
    cert_id,
    ...resources
  }) => resources);
  formattedGoal.study_resources = resources.map(({
    cert_id,
    ...resourceData
  }) => resourceData);

  formattedGoal.completed_cert_exams = formattedGoal.exams.filter((exam) => exam.status === "Passed").length;

  return formattedGoal;
}

async function handleExamGoal(goalId) {
  const examGoal = await knex("goals").where("goals.goal_id", goalId).leftJoin("exam_goals", "goals.goal_id", "exam_goals.goal_id").leftJoin("tests", "exam_goals.test_id", "tests.test_id").leftJoin("testing_centers", "exam_goals.center_id", "testing_centers.center_id").select("goals.*", "exam_goals.*", "tests.*", "testing_centers.name as center_name").first();

  const [studyResources, studyPlans] = await Promise.all([
    knex("test_study_resources").where("test_id", examGoal.test_id),
    knex("study_plan").where("test_id", examGoal.test_id),
  ]);

  const {
    test_id,
    ...goalWithoutReferenceId
  } = examGoal;

  goalWithoutReferenceId.study_resources = studyResources.map((resource) => ({resource_name: resource.resource_title, url: resource.url}));

  goalWithoutReferenceId.study_plans = studyPlans.map((plan) => ({topic: plan.topic, status: plan.status}));

  return goalWithoutReferenceId;
}

app.get("/goals", async (req, res) => {
  try {
    const goals = await knex("goals").select();

    const detailedGoalsPromises = goals.map(async (goal) => {
      switch (goal.goal_type_id) {
        case 1:
          return handleDegreeGoal(goal.goal_id);
        case 2:
          return handleProgramGoal(goal.goal_id);
        case 3:
          return handleCertGoal(goal.goal_id);
        case 4:
          return handleExamGoal(goal.goal_id);
        default:
          return goal;
      }
    });

    const allGoals = await Promise.all(detailedGoalsPromises);

    res.status(200).json(allGoals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/goals/:id", async (req, res) => {
  try {
    const goalId = req.params.id;
    const goalData = await knex("goals").where("goal_id", goalId).first();

    if (! goalData) {
      return res.status(404).json({message: "Goal not found."});
    }

    let result;

    switch (goalData.goal_type_id) {
      case 1: result = await handleDegreeGoal(goalId);
        break;
      case 2: result = await handleProgramGoal(goalId);
        break;
      case 3: result = await handleCertGoal(goalId);
        break;
      case 4: result = await handleExamGoal(goalId);
        break;
      default:
        return res.status(400).json({message: "Invalid goal type."});
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/degree-goal", async (req, res) => {

  try {
    await knex.transaction(async (trx) => {
      const [id] = await trx("goals").insert({goal_type_id: 1}).returning("goal_id");

      console.log(id);
      await trx("degree_goals").insert({
        goal_id: id.goal_id,
        school: req.body.school,
        degree_type: req.body.degree_type,
        major: req.body.major,
        mode_of_study: req.body.mode_of_study,
        start_date: req.body.start_date,
        total_credits_required: req.body.total_credits_required,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
      });
    });
    res.status(200).json({success: true, message: "Internal Server Error."});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.post("/program-goal", async (req, res) => {
  console.log(req.body);

  try {
    await knex.transaction(async (trx) => { 
      const [goal_id] = await trx("goals").insert({goal_type_id: 2}).returning("goal_id");
      const test = {
        ...goal_id,
        title: req.body.title,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        total_modules: parseInt(req.body.modules, 10),
        online: req.body.online
      };
      await trx("program_goals").insert(test);
    });
    res.status(200).json({success: true, message: "Success!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.post("/cert-goal", async (req, res) => {
  console.log(req.body);

  try {
    await knex.transaction(async (trx) => { 
      const [goal_id] = await trx("goals").insert({goal_type_id: 3}).returning("goal_id");
      const test = {
        ...goal_id,
        cert_id: req.body.id,
      };
      await trx("cert_goals").insert(test);
    });
    res.status(200).json({success: true, message: "Success!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.post("/exam-goal", async (req, res) => {
  console.log(req.body);

  try {
    await knex.transaction(async (trx) => {
      const [goalIdObj] = await trx("goals").insert({goal_type_id: 4}).returning("goal_id");

      await trx("exam_goals").insert({
        goal_id: goalIdObj.goal_id,
        test_id: req.body.exam_name,
        center_id: req.body.center_id,
        test_date: req.body.exam_date,
      });
    });

    res.status(200).json({ success: true, message: "Data updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});


app.post("/courses", async (req, res) => {
  const {
    title,
    credits,
    term_id,
    status,
    reference_id
  } = req.body;
  try {
    await knex("courses").insert({
      reference_id: reference_id,
      title: title,
      credits: credits,
      status: status,
      term_id: term_id
    });
    res.json({success: true, message: "Data updated successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.patch("/module", (req, res) => {
  const {module_id, status, reference_id} = req.body;
  knex("modules")
  .where({ module_id: module_id })
  .update({ status: status })
  .then(() => {
    res.json({ success: true, message: "Data updated successfully." });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

app.post("/courses", async (req, res) => {
  const {
    title,
    credits,
    term_id,
    status,
    reference_id
  } = req.body;
  try {
    await knex("courses").insert({
      reference_id: reference_id,
      title: title,
      credits: credits,
      status: status,
      term_id: term_id
    });
    res.json({success: true, message: "Data updated successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.put("/module", (req, res) => {
  const {module_id, status, reference_id} = req.body;

  knex("modules").update({status: req.body.status}).onConflict({module_id: req.body.module_id}).merge().then(() => {
    res.json({success: true, message: "Data updated successfully."});
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.post("/cert", async (req, res) => {
  const {
    title,
    credits,
    term_id,
    status,
    reference_id
  } = req.body;
  try {
    await knex("courses").insert({
      reference_id: reference_id,
      title: title,
      credits: credits,
      status: status,
      term_id: term_id
    });
    res.json({success: true, message: "Data updated successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal Server Error."});
  }
});

app.delete("/degree-goal", async (req, res) => {
  const {goal_id, reference_id} = req.body;

  try {
    await knex.transaction(async (trx) => {
      await trx("courses").where({reference_id: req.body.reference_id}).del();
      await trx("degree_goals").where({reference_id: req.body.reference_id}).del();
      await trx("degree_goals").where({reference_id: req.body.reference_id}).del();
      await trx("goals").where({goal_id: goal_id}).del();
    });

    res.status(200).send("Degree goal deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete degree goal");
  }
});

app.delete("/program-goal", async (req, res) => {
  const {goal_id, reference_id} = req.body;

  try {
    await knex.transaction(async (trx) => {
      await trx("modules").where({reference_id: reference_id}).del();
      await trx("program_goals").where({reference_id: reference_id}).del();
      await trx("goals").where({goal_id: goal_id}).del();
    });

    res.json({success: true, message: "Program goal deleted successfully"});
  } catch (err) {
    console.error(err);
    res.json({success: false, message: "Failed to delete program goal"});
  }
});

app.delete("/cert-goal", async (req, res) => {
  const {goal_id, reference_id} = req.body;
  console.log(reference_id);

  try {
    await knex.transaction(async (trx) => {
      await trx("cert_goals").where({reference_id: req.body.reference_id}).del();
      await trx("goals").where({goal_id: goal_id}).del();
    });

    res.json({success: true, message: "Program goal deleted successfully"});
  } catch (err) {
    console.error(err);
    res.json({success: false, message: "Failed to delete program goal"});
  }
});

app.delete("/exam-goal", async (req, res) => {
  try {
    await knex.transaction(async (trx) => {
      await trx("exam_goals").where({reference_id: req.body.reference_id}).del();
      await trx("goals").where({goal_id: req.body.goal_id}).del();
    });

    res.json({success: true, message: "Exam goal deleted successfully"});
  } catch (err) {
    console.error(err);
    res.json({success: false, message: "Failed to delete program goal"});
  }
});

async function handleCertifications() {
  const certifications = await knex("certifications");

  const results = await Promise.all(certifications.map(async (cert) => {
      const [exams, resources] = await Promise.all([
          knex("cert_exams")
              .leftJoin("cert_exam_status", "cert_exams.cert_exam_id", "cert_exam_status.cert_exam_id")
              .where("cert_exams.cert_id", cert.cert_id),
          knex("cert_study_resources").where("cert_id", cert.cert_id),
      ]);

      const formattedCert = { ...cert };
      formattedCert.exams = exams.map(({ cert_status_id, cert_id, ...examData }) => examData);
      formattedCert.study_resources = resources.map(({ cert_id, ...resourceData }) => resourceData);
      formattedCert.completed_cert_exams = formattedCert.exams.filter((exam) => exam.status === "Passed").length;

      return formattedCert;
  }));

  return results;
}
app.get('/certifications', async (req, res) => {
  try {
      const certificationsData = await handleCertifications();
      res.json(certificationsData);
  } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ error: "Failed to fetch certifications" });
  }
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  knex('users')
    .join('military_bases', 'users.base_id', '=', 'military_bases.base_id')
    .join('counselors', 'users.counselor_id', '=', 'counselors.counselor_id')
    .select(
      'users.name as userName',
      'users.rank',
      'military_bases.name as baseName',
      'military_bases.city',
      'military_bases.state',
      'military_bases.country',
      'counselors.name as counselorName'
    )
    .where('users.user_id', userId)
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    });
});


