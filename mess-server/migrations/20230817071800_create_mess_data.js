exports.up = function (knex) {
  return knex.schema
    .createTable("military_bases", (table) => {
      table.increments("base_id").primary();
      table.string("name").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("country").notNullable();
    })
    .then(() =>
      knex.schema.createTable("testing_centers", (table) => {
        table.increments("center_id").primary();
        table
          .integer("base_id")
          .unsigned()
          .references("base_id")
          .inTable("military_bases");
        table.string("name").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("counselors", (table) => {
        table.increments("counselor_id").primary();
        table
          .integer("base_id")
          .unsigned()
          .references("base_id")
          .inTable("military_bases");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("name").notNullable();
        table.string("rank").notNullable();
        table
          .integer("base_id")
          .unsigned()
          .references("base_id")
          .inTable("military_bases");
        table
          .integer("counselor_id")
          .unsigned()
          .references("counselor_id")
          .inTable("counselors");
      })
    )
    .then(() =>
      knex.schema.createTable("goal_types", (table) => {
        table.increments("goal_type_id").primary();
        table.string("name").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("goals", (table) => {
        table.increments("goal_id").primary();
        table
          .integer("goal_type_id")
          .unsigned()
          .references("goal_type_id")
          .inTable("goal_types");
      })
    )
    .then(() =>
      knex.schema.createTable("grades", (table) => {
        table.increments("grade_id").primary();
        table.string("grade_value");
        table.decimal("grade_point", 3, 2).defaultTo(0);
      })
    )
    .then(() =>
      knex.schema.createTable("semester_terms", (table) => {
        table.increments("term_id").primary();
        table.string("term_name").notNullable();
        table.date("start_date").notNullable();
        table.date("end_date").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("certifications", (table) => {
        table.increments("cert_id").primary();
        table.string("title").notNullable();
        table.string("certifying_body").notNullable();
        table.integer("total_exams").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("cert_study_resources", (table) => {
        table.increments("resource_id").primary();
        table
          .integer("cert_id")
          .unsigned()
          .references("cert_id")
          .inTable("certifications");
        table.string("resource_name").notNullable();
        table.string("url").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("cert_exams", (table) => {
        table.increments("cert_exam_id").primary();
        table
          .integer("cert_id")
          .unsigned()
          .references("cert_id")
          .inTable("certifications");
        table.string("title").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("cert_exam_status", (table) => {
        table.increments("cert_status_id").primary();
        table
          .integer("cert_exam_id")
          .unsigned()
          .references("cert_exam_id")
          .inTable("cert_exams")
          .unique();
        table.date("test_date").defaultTo(null);
        table.string("status").defaultTo("Unregistered");
      })
    )
    .then(() =>
      knex.schema.createTable("tests", (table) => {
        table.increments("test_id").primary();
        table.string("title").notNullable();
        table.string("type").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("test_study_resources", (table) => {
        table.increments("tsr_id").primary();
        table
          .integer("test_id")
          .unsigned()
          .references("test_id")
          .inTable("tests");
        table.string("resource_title").notNullable();
        table.string("url").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("study_plan", (table) => {
        table.increments("study_plan_id").primary();
        table
          .integer("test_id")
          .unsigned()
          .references("test_id")
          .inTable("tests");
        table.string("topic").notNullable();
        table.string("status").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("degree_goals", (table) => {
        table.increments("reference_id").primary();
        table
          .integer("goal_id")
          .unsigned()
          .references("goal_id")
          .inTable("goals");
        table.string("school").notNullable();
        table.string("degree_type").notNullable();
        table.string("major").notNullable();
        table.string("mode_of_study").notNullable();
        table.integer("total_credits_required");
        table.integer("completed_credits");
        table.date("start_date");
        table.decimal("gpa", 3, 2);
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("country").notNullable();
      })
    )
    .then(() =>
      knex.schema.createTable("program_goals", (table) => {
        table.increments("reference_id").primary();
        table
          .integer("goal_id")
          .unsigned()
          .references("goal_id")
          .inTable("goals");
        table.string("title").notNullable();
        table.boolean("online").defaultTo(false);
        table.integer("total_modules");
        table.integer("completed_modules").defaultTo(0);
        table.string("start_date");
        table.string("end_date");
        table.string("city");
        table.string("state");
        table.string("country");
      })
    )
    .then(() =>
      knex.schema.createTable("cert_goals", (table) => {
        table.increments("reference_id").primary();
        table
          .integer("goal_id")
          .unsigned()
          .references("goal_id")
          .inTable("goals");
        table
          .integer("cert_id")
          .unsigned()
          .references("cert_id")
          .inTable("certifications");
        table.integer("completed_cert_exams").defaultTo(0);
      })
    )
    .then(() =>
      knex.schema.createTable("exam_goals", (table) => {
        table.increments("reference_id").primary();
        table
          .integer("goal_id")
          .unsigned()
          .references("goal_id")
          .inTable("goals");
        table
          .integer("test_id")
          .unsigned()
          .references("test_id")
          .inTable("tests");
        table.date("test_date");
        table.string("status").defaultTo("Scheduled");
        table
          .integer("center_id")
          .unsigned()
          .references("center_id")
          .inTable("testing_centers");
      })
    )
    .then(() =>
      knex.schema.createTable("courses", (table) => {
        table.increments("course_id").primary();
        table
          .integer("reference_id")
          .unsigned()
          .references("reference_id")
          .inTable("degree_goals");
        table.string("title").notNullable();
        table.integer("credits").defaultTo(0).notNullable();
        table
          .integer("term_id")
          .unsigned()
          .references("term_id")
          .inTable("semester_terms");
        table
          .integer("grade_id")
          .unsigned()
          .references("grade_id")
          .inTable("grades")
          .defaultTo(12);
        table.string("status").defaultTo("Unregistered");
      })
    )
    .then(() =>
      knex.schema.createTable("modules", (table) => {
        table.increments("module_id").primary();
        table
          .integer("reference_id")
          .unsigned()
          .references("reference_id")
          .inTable("program_goals");
        table.string("title").notNullable();
        table.string("status")
      })
    )
    .then(() =>
      knex.schema.createTable("pinned_articles", (table) => {
        table.increments("id").primary();
        table
          .integer("article_id")
          .unsigned()
          .unique()
          .notNullable();
        table.string("slug");
        table.string("title");
        table.text("content");
    })
  )
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("modules")
    .then(() => knex.schema.dropTableIfExists("pinned_articles"))
    .then(() => knex.schema.dropTableIfExists("courses"))
    .then(() => knex.schema.dropTableIfExists("exam_goals"))
    .then(() => knex.schema.dropTableIfExists("cert_goals"))
    .then(() => knex.schema.dropTableIfExists("program_goals"))
    .then(() => knex.schema.dropTableIfExists("degree_goals"))
    .then(() => knex.schema.dropTableIfExists("study_plan"))
    .then(() => knex.schema.dropTableIfExists("test_study_resources"))
    .then(() => knex.schema.dropTableIfExists("tests"))
    .then(() => knex.schema.dropTableIfExists("cert_exam_status"))
    .then(() => knex.schema.dropTableIfExists("cert_exams"))
    .then(() => knex.schema.dropTableIfExists("cert_study_resources"))
    .then(() => knex.schema.dropTableIfExists("certifications"))
    .then(() => knex.schema.dropTableIfExists("semester_terms"))
    .then(() => knex.schema.dropTableIfExists("goals"))
    .then(() => knex.schema.dropTableIfExists("grades"))
    .then(() => knex.schema.dropTableIfExists("goal_types"))
    .then(() => knex.schema.dropTableIfExists("users"))
    .then(() => knex.schema.dropTableIfExists("counselors"))
    .then(() => knex.schema.dropTableIfExists("testing_centers"))
    .then(() => knex.schema.dropTableIfExists("military_bases"));
};
