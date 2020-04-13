const con = require("./dbconn.js");

// constructor
const Registration = function(registration) {
  this.id = registration.id;
  this.teacher_fk = registration.teacher_fk;
  this.student_fk = registration.student_fk;
};

/**
 * The function is for checking if the registration for the student to the teacher already exists
 * 
 * @param {registration} registration have the teacher to student mapping details
 * @param {result} result is the callback function
 */
function isRegistrationExists(registration, result) {
  con.query(`SELECT * FROM registration WHERE teacher_fk = '${registration.teacher_fk}' and student_fk = '${registration.student_fk}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return result(err, null);
    }

    if (res.length) {
      console.log("found student: ", res);
      
      return result(null, res);
    }

    // not found student with the id
    return result({ email: "not_found" }, null);
  });
};

/**
 * The function to bulk register the students to the teacher
 * @param {registrations} registrations the mapping of teacher to student list
 * @param {result} result the callback function
 */
function registerStudents(registrations, result) {
  con.query(`INSERT INTO registration (teacher_fk, student_fk) VALUES ?`, [registrations], (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("no error is a success case.");
      // successReg.push(registrations[i]);
      result(null, registrations);
      return;
    }
  });
};

/**
 * The function to get the common student list between the teachers.
 * For one teacher, it will retrieve all the students of the teacher
 */
Registration.getCommonStudents = (teachers, result) => {
  con.query(`select sub.email, count(sub.email) from (select s.email from student s inner join registration r on r.student_fk=s.id and s.suspended=false and r.teacher_fk in (select t.id from teacher t where t.email in (?))) sub group by email having count(email) > ${(teachers.length - 1)}`, [teachers], (err, res) => {
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

    result({ commonstudents: "not_found" }, null);
  });
};

/**
 * The function checks if the students to teacher registration already exists.
 * If registration is not existing then a new registration is created.
 */
Registration.checkAndRegistrations = (registrations, result) => {
  var response = [];
  var errors = [];
  Promise.all(registrations.map(r => {
    var promise = new Promise(function(resolve, reject) {
      isRegistrationExists(r, function(err, rows) {
        if (err && err.email == 'not_found') {
          resolve(r);
        } else {
          reject(r);
        }
      });
    });
    return promise.then(row => {
      response.push(row);
    }, error => {
      errors.push(error);
    });
  })).then ((resp) => {
    console.log(response);

    const regs = response.map(re => [re.teacher_fk, re.student_fk]);
    if (Array.isArray(regs) && regs.length > 0) {
      var promise = new Promise(function(resolve, reject) {
        registerStudents(regs, function(err, rows) {
          if (err) {
            reject(regs);
          } else {
            resolve(regs);
          }
        });
      });
      return promise.then(row => {
        result(null, regs);
      }, error => {
        console.log('errors: ' + error);
        result({errors: error}, null);
      });
    } else {
      result(null, regs);
    }
  });
};

module.exports = Registration;