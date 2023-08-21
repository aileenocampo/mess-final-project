import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  font: {
    textAlign: "center",
    width: "100%",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "bold",
    color: "#DAA520",
    letterSpacing: "3px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)",
    textTransform: "uppercase",
    fontSize: "calc(14px + 2.5vw)",
    position: "relative",
    marginBottom: "2px",
    marginTop: "0px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "4%",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FAFAFA",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
  },
  subHeading: {
    fontSize: "20px",
    color: "#333",
    fontWeight: "500",
    margin: "15px 0",
    marginBottom: "0px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "4px",
    marginTop: "2.2%",
  },
  list: {
    margin: "10px 0",
    paddingLeft: "25px",
    marginTop: "1%",
    marginBottom: "0px",
  },
  expandedContainer: {
    paddingBottom: "3%",
  },
  textField: {
    marginTop: "2% !important",
    marginBottom: "1% !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0.5%",
  },
  addButton: {
    fontSize: "1rem !important",
    width: "160px !important",
    marginTop: "3.3% !important",
    padding: "10px 20px !important",
    display: "block !important",
    backgroundColor: "#CCC2F2 !important",
    color: "#6E37A6 !important",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1) !important",
    transition: "boxShadow .3s ease, transform .3s ease !important",
    "&:hover !important": {
      backgroundColor: "#E6E0FF !important",
      boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.1) !important",
      transform: "translateY(-2px) !important",
    },
    dialogContent: {
      height: "500px",
    },
  },
  saveButton: {
    margin: "2px !important",
    backgroundColor: "#DEDEDE !important",
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important",
    },
  },
  cancelButton: {
    margin: "2px !important",
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
}));

function DegreeGoal({ goal }) {
  const classes = useStyles();

  const [courses, setCourses] = useState(goal.courses || []);
  const [showCourseForm, setShowCourseForm] = useState(false);

  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState();

  const completedCourses = courses.filter(
    (course) => course.status === "Complete"
  );
  const ongoingCourses = courses.filter(
    (course) => course.status === "In-Progress"
  );
  const registeredCourses = courses.filter(
    (course) => course.status === "Registered"
  );

  const [newCourse, setNewCourse] = useState({
    title: "",
    credits: 0,
    semesterTerm: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const [courseData, setCourseData] = useState(null);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleFormSubmit = () => {
    setCourseData({
      title: newCourse.title,
      credits: newCourse.credits,
      term_id: semester,
      status: newCourse.status,
      reference_id: goal.goal_id,
    });
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (!shouldSubmit || !courseData) return;

    fetch("http://localhost:8080/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowCourseForm(false);
          setCourses((prevCourses) => [...prevCourses, courseData]);
          setNewCourse({
            title: "",
            credits: 0,
            semesterTerm: "",
            status: "",
          });
        } else {
          alert("Failed to update exam details. Please try again.");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
      })
      .finally(() => {
        setShouldSubmit(false);
      });
  }, [shouldSubmit, courseData, goal.goal_id]);

  useEffect(() => {
    let getSemesters = async () => {
      try {
        let response = await fetch("http://localhost:8080/semester_terms");
        let data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };
    getSemesters();
  }, []);

  return (
    <div
      className={`${classes.container} ${
        showCourseForm ? classes.expandedContainer : ""
      }`}
    >
      <h2 className={classes.font}>
        {goal.degree_type} - {goal.major}
      </h2>
      <p className={classes.text}>
        <strong>School:</strong> {goal.school}
      </p>
      <p className={classes.text}>
        <strong>Major:</strong> {goal.major}
      </p>
      <p className={classes.text}>
        <strong>Degree Type:</strong> {goal.degree_type}
      </p>
      <p className={classes.text}>
        <strong>GPA:</strong> {goal.gpa}
      </p>
      <p className={classes.text}>
        <strong>Start Date:</strong>{" "}
        {moment(goal.start_date).format("MMMM D, YYYY")}
      </p>
      <p className={classes.text}>
        <strong>City:</strong> {goal.city}
      </p>

      {completedCourses.length > 0 && (
        <>
          <h3 className={classes.text}>Completed Courses</h3>
          <ul className={classes.list}>
            {completedCourses.map((course) => (
              <li key={course.id}>
                <strong>Name: </strong>
                {course.title} - <strong>Term: </strong>
                {course.semester_term} - <strong>GPA: </strong>
                {course.grade}
              </li>
            ))}
          </ul>
        </>
      )}

      {ongoingCourses.length > 0 && (
        <>
          <h3 className={classes.text}>In Progress Courses</h3>
          <ul className={classes.list}>
            {ongoingCourses.map((course) => (
              <li key={course.id}>
                <strong>Name: </strong>
                {course.title} - <strong>Term: </strong>
                {course.semester_term} - <strong>Start Date: </strong>
                {moment(course.start_date).format("MMMM D, YYYY")} -
                <strong> End Date: </strong>
                {moment(course.end_date).format("MMMM D, YYYY")}
              </li>
            ))}
          </ul>
        </>
      )}

      {registeredCourses.length > 0 && (
        <>
          <h3 className={classes.text}>Registered Courses</h3>
          <ul className={classes.list}>
            {registeredCourses.map((course) => (
              <li key={course.id}>
                <strong>Name: </strong>
                {course.title} - <strong>Term: </strong>
                {course.semester_term} - <strong>Start Date: </strong>
                {moment(course.start_date).format("MMMM D, YYYY")} -
                <strong> End Date: </strong>
                {moment(course.end_date).format("MMMM D, YYYY")}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={() => setShowCourseForm(true)}
          className={classes.addButton}
        >
          Add Course
        </Button>
      </div>

      <Dialog open={showCourseForm} onClose={() => setShowCourseForm(false)}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            label="Course Title"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Credits"
            name="credits"
            value={newCourse.credits}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
          <FormControl className={classes.textField} fullWidth>
            <InputLabel id="semesterTerm-label">Semester Term</InputLabel>
            <Select
              labelId="semesterTerm-label"
              name="semesterTerm"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              {semesters.map((semester) => (
                <MenuItem key={semester.term_id} value={semester.term_id}>
                  {semester.term_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newCourse.status}
              onChange={(event) => {
                setNewCourse((prevCourse) => ({
                  ...prevCourse,
                  status: event.target.value,
                }));
              }}
              name="status"
            >
              <MenuItem value="Complete">Completed</MenuItem>
              <MenuItem value="In-Progress">In-Progress</MenuItem>
              <MenuItem value="Registered">Registered</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormSubmit} className={classes.saveButton}>
            Save Course
          </Button>
          <Button
            className={classes.cancelButton}
            onClick={() => setShowCourseForm(false)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DegreeGoal;
