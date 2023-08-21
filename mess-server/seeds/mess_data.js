exports.seed = function (knex) {
  return knex("modules").del()
    .then(() => knex("pinned_articles").del())
    .then(() => knex("courses").del())
    .then(() => knex("exam_goals").del())
    .then(() => knex("cert_goals").del())
    .then(() => knex("program_goals").del())
    .then(() => knex("degree_goals").del())
    .then(() => knex("study_plan").del())
    .then(() => knex("test_study_resources").del())
    .then(() => knex("tests").del())
    .then(() => knex("cert_exam_status").del())
    .then(() => knex("cert_exams").del())
    .then(() => knex("cert_study_resources").del())
    .then(() => knex("certifications").del())
    .then(() => knex("semester_terms").del())
    .then(() => knex("grades").del())
    .then(() => knex("goals").del())
    .then(() => knex("goal_types").del())
    .then(() => knex("users").del())
    .then(() => knex("counselors").del())
    .then(() => knex("testing_centers").del())
    .then(() => knex("military_bases").del())
    .then(() => {
      return knex("military_bases").insert([
        {
          name: "Fort Hamilton",
          city: "Brooklyn",
          state: "New York",
          country: "USA",
        },
        {
          name: "Camp Pendleton",
          city: "Oceanside",
          state: "California",
          country: "USA",
        },
        {
          name: "Fort Bragg",
          city: "Fayetteville",
          state: "North Carolina",
          country: "USA",
        },
        {
          name: "Fort Hood",
          city: "Killeen",
          state: "Texas",
          country: "USA",
        },
        {
          name: "Joint Base Lewis-McChord",
          city: "Tacoma",
          state: "Washington",
          country: "USA",
        },
        {
          name: "Fort Benning",
          city: "Columbus",
          state: "Georgia",
          country: "USA",
        },
        {
          name: "Fort Carson",
          city: "Colorado Springs",
          state: "Colorado",
          country: "USA",
        },
      ]);
    })
    .then(() => {
      return knex("pinned_articles").insert([
        { 
          article_id: 101, 
          slug: "exam-strategies", 
          title: "Top 5 Techniques to Ace Your Exams",  
          content: "Learn about the most effective strategies that have helped thousands of students improve their exam performance. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et odio pellentesque. Sapien et ligula ullamcorper malesuada proin libero. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Quis lectus nulla at volutpat diam. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Sed risus pretium quam vulputate dignissim suspendisse. Sem viverra aliquet eget sit amet tellus cras. Amet justo donec enim diam vulputate ut pharetra sit. Maecenas sed enim ut sem viverra aliquet eget. A erat nam at lectus urna duis convallis convallis tellus. Tempor nec feugiat nisl pretium fusce id. Congue nisi vitae suscipit tellus mauris. Ultricies mi quis hendrerit dolor magna eget. Vitae nunc sed velit dignissim sodales ut eu sem integer. Nulla posuere sollicitudin aliquam ultrices. Ridiculus mus mauris vitae ultricies leo integer. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Id cursus metus aliquam eleifend mi in.",
        },
        { 
          article_id: 202, 
          slug: "exam-strategies", 
          title: "Understanding the Financial Aid Process",
          content: "A comprehensive guide on navigating the complexities of the financial aid process and securing the best possible aid for your education Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et odio pellentesque. Sapien et ligula ullamcorper malesuada proin libero. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Quis lectus nulla at volutpat diam. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Sed risus pretium quam vulputate dignissim suspendisse. Sem viverra aliquet eget sit amet tellus cras. Amet justo donec enim diam vulputate ut pharetra sit. Maecenas sed enim ut sem viverra aliquet eget. A erat nam at lectus urna duis convallis convallis tellus. Tempor nec feugiat nisl pretium fusce id. Congue nisi vitae suscipit tellus mauris. Ultricies mi quis hendrerit dolor magna eget. Vitae nunc sed velit dignissim sodales ut eu sem integer. Nulla posuere sollicitudin aliquam ultrices. Ridiculus mus mauris vitae ultricies leo integer. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Id cursus metus aliquam eleifend mi in..",
        },
        { 
          article_id: 203, 
          slug: "exam-strategies", 
          title: "Maximizing Your Educational Benefits", 
          content: "Tips and strategies to get the most out of your educational benefits and scholarships. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et odio pellentesque. Sapien et ligula ullamcorper malesuada proin libero. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Quis lectus nulla at volutpat diam. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Sed risus pretium quam vulputate dignissim suspendisse. Sem viverra aliquet eget sit amet tellus cras. Amet justo donec enim diam vulputate ut pharetra sit. Maecenas sed enim ut sem viverra aliquet eget. A erat nam at lectus urna duis convallis convallis tellus. Tempor nec feugiat nisl pretium fusce id. Congue nisi vitae suscipit tellus mauris. Ultricies mi quis hendrerit dolor magna eget. Vitae nunc sed velit dignissim sodales ut eu sem integer. Nulla posuere sollicitudin aliquam ultrices. Ridiculus mus mauris vitae ultricies leo integer. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Id cursus metus aliquam eleifend mi in.",
        },
      ]);
    })
    .then(() => {
      return knex("testing_centers").insert([
        { base_id: 1, name: "Fort Hamilton Brooklyn Diagnostic Center" },
        { base_id: 1, name: "Fort Hamilton Rapid Test Facility" },
        { base_id: 2, name: "DoD San Diego Advanced Center" },
        { base_id: 2, name: "DoD San Diego Rapid Test Unit" },
        { base_id: 3, name: "USAF Travis Comprehensive Testing" },
        { base_id: 3, name: "Travis Air Base Quick Test" },
        { base_id: 4, name: "Pearl Harbor Naval Diagnostics" },
        { base_id: 4, name: "Hawaii Navy Express Test Center" },
        { base_id: 5, name: "Quantico Marine Test Center" },
        { base_id: 5, name: "Virginia Marine Quick Diagnostics" },
        { base_id: 6, name: "West Point Army Diagnostic Center" },
        { base_id: 6, name: "New York Army Rapid Test Facility" },
        { base_id: 7, name: "Space Force Colorado Diagnostics" },
        { base_id: 7, name: "Colorado Space Test Facility" },
      ]);
    })
    .then(() => {
      return knex("counselors").insert([
        {
          base_id: 1,
          name: "Judy Danner",
          email: "judy.danner@forthamilton.mil",
          phone: "718-555-1234",
        },
        {
          base_id: 1,
          name: "Jane Smith",
          email: "jane.smith@forthamilton.mil",
          phone: "718-555-1235",
        },
        {
          base_id: 1,
          name: "Emily Johnson",
          email: "emily.johnson@forthamilton.mil",
          phone: "718-555-1236",
        },
        {
          base_id: 2,
          name: "James Wilson",
          email: "james.wilson@dod.mil",
          phone: "512-555-1234",
        },
        {
          base_id: 2,
          name: "Lisa Martin",
          email: "lisa.martin@dod.mil",
          phone: "512-555-1235",
        },
        {
          base_id: 3,
          name: "Robert Brown",
          email: "robert.brown@dod.mil",
          phone: "213-555-1236",
        },
        {
          base_id: 3,
          name: "Jennifer Lee",
          email: "jennifer.lee@dod.mil",
          phone: "213-555-1237",
        },
        {
          base_id: 4,
          name: "Angela Davis",
          email: "angela.davis@us.navy.mil",
          phone: "305-555-7890",
        },
        {
          base_id: 4,
          name: "Janette White",
          email: "janette.white@us.navy.mil",
          phone: "305-555-7891",
        },
        {
          base_id: 5,
          name: "John Wallace",
          email: "john.wallace@spaceforce.mil",
          phone: "404-555-1234",
        },
        {
          base_id: 5,
          name: "Susan Miller",
          email: "susan.miller@spaceforce.mil",
          phone: "404-555-1235",
        },
        {
          base_id: 6,
          name: "Robert Jackson",
          email: "robert.jackson@usmc.mil",
          phone: "312-555-1236",
        },
        {
          base_id: 6,
          name: "Alan Rickman",
          email: "alan.rickman@usmc.mil",
          phone: "312-555-1237",
        },
        {
          base_id: 7,
          name: "Jessica Riley",
          email: "jessica.riley@us.af.mil",
          phone: "206-555-1238",
        },
        {
          base_id: 7,
          name: "Steve Harrington",
          email: "steve.harrington@us.af.mil",
          phone: "206-555-1239",
        },
      ]);
    })
    .then(() => {
      return knex("users").insert([
        { name: "Betty James", rank: "Sergeant", base_id: 2, counselor_id: 5 },
      ]);
    })
    .then(() => {
      return knex("goal_types").insert([
        { name: "Degree" },
        { name: "Program" },
        { name: "Certification" },
        { name: "Exam" },
      ]);
    })

    .then(() => {
      return knex("goals").insert([
        { goal_type_id: 1 }, // Link to degreeGoals
        { goal_type_id: 2 }, // Link to programGoals
        { goal_type_id: 3 }, // Link to certifications
        { goal_type_id: 3 },
        { goal_type_id: 4 },
        { goal_type_id: 4 },
        { goal_type_id: 4 },
        { goal_type_id: 4 },
      ]);
    })
    .then(() => {
      return knex("grades").insert([
        { grade_value: "A", grade_point: 4.0 },
        { grade_value: "A-", grade_point: 3.67 },
        { grade_value: "B+", grade_point: 3.33 },
        { grade_value: "B", grade_point: 3.0 },
        { grade_value: "B-", grade_point: 2.67 },
        { grade_value: "C+", grade_point: 2.33 },
        { grade_value: "C", grade_point: 2.0 },
        { grade_value: "C-", grade_point: 1.67 },
        { grade_value: "D+", grade_point: 1.33 },
        { grade_value: "D", grade_point: 1.0 },
        { grade_value: "F", grade_point: 0.0 },
        { grade_value: "U", grade_point: 0.0 },
      ]);
    })
    .then(() => {
      return knex("semester_terms").insert([
        {
          term_name: "Spring 2022",
          start_date: "2022-01-15",
          end_date: "2022-05-15",
        },
        {
          term_name: "Fall 2022",
          start_date: "2022-08-15",
          end_date: "2022-12-15",
        },
        {
          term_name: "Spring 2023",
          start_date: "2023-01-15",
          end_date: "2023-05-15",
        },
        {
          term_name: "Fall 2023",
          start_date: "2023-08-15",
          end_date: "2023-12-15",
        },
        {
          term_name: "Spring 2044",
          start_date: "2044-01-15",
          end_date: "2044-05-15",
        },
        {
          term_name: "Fall 2044",
          start_date: "2044-08-15",
          end_date: "2044-12-15",
        },
      ]);
    })
    .then(() => {
      return knex("certifications").insert([
        {
          title: "AWS Cloud Certification",
          certifying_body: "Amazon",
          total_exams: 4,
        },
        {
          title: "Java SE Certification",
          certifying_body: "Oracle",
          total_exams: 2,
        },
        {
          title: "Microsoft Certified: Azure Solutions Architect Expert",
          certifying_body: "Microsoft",
          total_exams: 2,
        },
        {
          title: "Cisco Certified Network Professional",
          certifying_body: "Cisco",
          total_exams: 3,
        },
        {
          title: "Google Associate Cloud Engineer",
          certifying_body: "Google Cloud",
          total_exams: 1,
        },
        {
          title: "Certified Ethical Hacker (CEH)",
          certifying_body: "EC-Council",
          total_exams: 1,
        },
        {
          title: "CompTIA Security+",
          certifying_body: "CompTIA",
          total_exams: 1,
        },
        {
          title: "Certified Information Systems Security Professional",
          certifying_body: "ISC²",
          total_exams: 1,
        },
        {
          title: "Certified Kubernetes Administrator",
          certifying_body: "Cloud Native Computing Foundation",
          total_exams: 1,
        },
        {
          title: "Professional Scrum Master I",
          certifying_body: "Scrum.org",
          total_exams: 1,
        },
        {
          title: "Red Hat Certified Engineer",
          certifying_body: "Red Hat",
          total_exams: 1,
        },
        {
          title: "Salesforce Certified Administrator",
          certifying_body: "Salesforce",
          total_exams: 1,
        },
        {
          title: "Certified Internet of Things Practitioner",
          certifying_body: "CertNexus",
          total_exams: 1,
        },
        {
          title: "Amazon Web Services Certified DevOps Engineer",
          certifying_body: "Amazon",
          total_exams: 1,
        },
      ]);
    })
    .then(() => {
      return knex("cert_study_resources").insert([
        {
          cert_id: 1,
          resource_name: "AWS Official Study Guide",
          url: "https://aws.amazon.com/",
        },
        {
          cert_id: 2,
          resource_name: "Oracle Java Documentation",
          url: "https://docs.oracle.com/",
        },
        {
          cert_id: 3,
          resource_name: "Microsoft Learn: Azure Solutions Architect",
          url: "https://learn.microsoft.com/",
        },
        {
          cert_id: 4,
          resource_name: "Cisco Learning Network",
          url: "https://learningnetwork.cisco.com/",
        },
        {
          cert_id: 1,
          resource_name: "AWS Whitepapers",
          url: "https://aws.amazon.com/whitepapers/",
        },
        {
          cert_id: 3,
          resource_name: "Azure Architecture Center",
          url: "https://docs.microsoft.com/azure/architecture/",
        },
        {
          cert_id: 5,
          resource_name: "Google Cloud Training",
          url: "https://cloud.google.com/training/",
        },
        {
          cert_id: 6,
          resource_name: "CEH Training",
          url: "https://www.eccouncil.org/",
        },
        {
          cert_id: 7,
          resource_name: "CompTIA Study Guide",
          url: "https://www.comptia.org/",
        },
        {
          cert_id: 8,
          resource_name: "CISSP Training and Study",
          url: "https://www.isc2.org/",
        },
        {
          cert_id: 9,
          resource_name: "Kubernetes Training",
          url: "https://www.cncf.io/",
        },
        {
          cert_id: 10,
          resource_name: "Scrum Master Training",
          url: "https://www.scrum.org/",
        },
        {
          cert_id: 11,
          resource_name: "Red Hat Training",
          url: "https://www.redhat.com/",
        },
        {
          cert_id: 12,
          resource_name: "CDP Study Materials",
          url: "https://iccp.org/",
        },
        {
          cert_id: 13,
          resource_name: "Salesforce Training",
          url: "https://trailhead.salesforce.com/",
        },
        {
          cert_id: 14,
          resource_name: "IoT Training Courses",
          url: "https://www.certnexus.com/",
        },
      ]);
    })
    .then(() => {
      return knex("cert_exams").insert([
        { cert_id: 1, title: "AWS Certified Practice Test" },
        { cert_id: 1, title: "AWS Certified Solutions Architect" },
        { cert_id: 1, title: "AWS Certified Developer" },
        { cert_id: 1, title: "AWS Certified SysOps Administrator" },
        { cert_id: 2, title: "Java SE Programmer I (1Z0-815)" },
        { cert_id: 2, title: "Java SE Programmer II (1Z0-816)" },
        { cert_id: 3, title: "Microsoft Azure Architect Technologies" },
        { cert_id: 3, title: "Microsoft Azure Architect Design" },
        { cert_id: 4, title: "CCNP Routing and Switching" },
        { cert_id: 4, title: "CCNP Collaboration" },
        { cert_id: 4, title: "CCNP Security" },
        { cert_id: 5, title: "Google Cloud Associate Exam" },
        { cert_id: 6, title: "CEH v11 Exam" },
        { cert_id: 7, title: "CompTIA Security+ SY0-601" },
        { cert_id: 8, title: "CISSP Certification Exam" },
        { cert_id: 9, title: "CKA Exam" },
        { cert_id: 10, title: "PSM I Assessment" },
        { cert_id: 11, title: "RHCE Exam for Red Hat Enterprise Linux 8" },
        { cert_id: 12, title: "CDP Core Exam" },
        { cert_id: 13, title: "Salesforce Administrator Exam" },
        { cert_id: 14, title: "IoT Practitioner Exam" },
      ]);
    })
    .then(() => {
      return knex("cert_exam_status").insert([
        { cert_exam_id: 1, test_date: "2023-07-25", status: "Registered" },
        { cert_exam_id: 2, test_date: "2023-02-15", status: "Passed" },
        { cert_exam_id: 3, test_date: "2023-04-20", status: "Failed" },
        { cert_exam_id: 4, status: "Unregistered" },
        { cert_exam_id: 5, status: "Unregistered" },
        { cert_exam_id: 6, status: "Unregistered" },
      ]);
    })
    .then(() => {
      return knex("tests").insert([
        { title: "Principles of Statistics", type: "DSST" },
        { title: "Introduction to Computing", type: "DSST" },
        { title: "College Mathematics", type: "CLEP" },
        { title: "Analyzing and Interpreting Literature", type: "CLEP" },
      ]);
    })
    .then(() => {
      return knex("test_study_resources").insert([
        { test_id: 1, resource_title: "Statistics 101", url: "www.study.com" },
        {
          test_id: 2,
          resource_title: "Math Study Source",
          url: "www.science.com",
        },
        { test_id: 2, resource_title: "Coding 101", url: "www.math.com" },
      ]);
    })
    .then(() => {
      return knex("study_plan").insert([
        {
          test_id: 1,
          topic: "Probability",
          status: "Studied",
        },
        {
          test_id: 1,
          topic: "Sampling",
          status: "Pending",
        },
      ]);
    })
    .then(() => {
      return knex("degree_goals").insert([
        {
          goal_id: 1,
          school: "Community College of Denver",
          degree_type: "Associate",
          major: "Computer Science",
          mode_of_study: "On-Campus",
          total_credits_required: 65,
          completed_credits: 30,
          start_date: "2020-09-01",
          gpa: 3.5,
          city: "Denver",
          state: "Colorado",
          country: "USA",
        },
      ]);
    })
    .then(() => {
      return knex("program_goals").insert([
        {
          goal_id: 2,
          title: "Python Programming Immersive",
          total_modules: 12,
          completed_modules: 7,
          start_date: "2023-01-15",
          end_date: "2023-12-15",
          city: "NYC",
          state: "New York",
          country: "USA",
        },
      ]);
    })
    .then(() => {
      return knex("cert_goals").insert([
        { goal_id: 3, cert_id: 1 },
        { goal_id: 4, cert_id: 2 },
      ]);
    })
    .then(() => {
      return knex("exam_goals").insert([
        {
          goal_id: 5,
          test_id: 1,
          test_date: "2023-08-30",
          status: "Passed",
          center_id: 2,
        },
        {
          goal_id: 6,
          test_id: 2,
          test_date: "2023-09-15",
          status: "Failed",
          center_id: 2,
        },
        {
          goal_id: 7,
          test_id: 3,
          test_date: "2023-10-10",
          status: "Scheduled",
          center_id: 2,
        },
        {
          goal_id: 8,
          test_id: 4,
          test_date: "2023-11-05",
          status: "Passed",
          center_id: 2,
        },
      ]);
    })
    .then(() => {
      return knex("courses").insert([
        {
          reference_id: 1,
          title: "Intro to Algorithms",
          credits: 3,
          term_id: 2,
          grade_id: 1,
          status: "Complete",
        },
        {
          reference_id: 1,
          title: "Database Management",
          credits: 3,
          term_id: 1,
          grade_id: 2,
          status: "Complete",
        },
      ]);
    })
    .then(() => {
      return knex("modules").insert([
        {
          reference_id: 1,
          title: "Python Basics",
          status: "Complete",
        },
        {
          reference_id: 1,
          title: "Advanced Python",
          status: "In-Progress",
        },
      ]);
    });
};
