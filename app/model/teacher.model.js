const con = require("./dbconn.js");

// constructor
const Teacher = function(teacher) {
  this.id = teacher.id;
  this.email = teacher.email;
};
/**
 * The function is for finding the teacher details by email
 */
Teacher.findTeacherByEmail = (email, result) => {
  con.query(`SELECT * FROM teacher WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found teacher: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found teacher with the id
    result({ email: "not_found" }, null);
  });
};

/**
 * The function is for suspending the student based on email
 */
Teacher.suspendStudentByEmail = (email, result) => {
  con.query(
    "UPDATE student SET suspended = ? WHERE email = ?",
    [true, email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // student not found
        result({ student: "not_found" }, null);
        return;
      }

      console.log("suspended the student: ", email);
      result(null, { email: email });
    }
  );
};

/**
 * The function is for retrieving the recipients for the teacher for broadcasting the notifications
 */
Teacher.retrieveRecipients = (body, result) => {
  con.query(`SELECT s.email FROM registration r inner join teacher t on r.teacher_fk=t.id inner join student s on r.student_fk=s.id and s.suspended=false WHERE t.email = '${body.teacher}' and s.email not in (?)`, [body.emails], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found teacher: ", res);
      result(null, res);
      return;
    }

    // not found teacher with the id
    result({ student: "not_found" }, null);
  });
};

module.exports = Teacher;