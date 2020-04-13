const con = require("./dbconn.js");

// constructor
const Student = function(student) {
  this.id = student.id;
  this.email = student.email;
};

/**
 * The function is for finding the students by their emails
 */
Student.findStudentsByEmails = (emails, result) => {
  con.query(`SELECT * FROM student WHERE suspended=false and email IN (?)`, [emails], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res);
      result(null, res);
      return;
    }

    // not found student with the id
    result({ email: "not_found" }, null);
  });
};

module.exports = Student;