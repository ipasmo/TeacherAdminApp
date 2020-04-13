const Teacher = require("../model/teacher.model.js");
const Student = require("../model/student.model.js");
const Registration = require("../model/registration.model.js");

/**
 * The below controller function is the endpoint for registering the students to the teacher
 * 
 * @author gmone
 */
exports.registerStudents = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Teacher.findTeacherByEmail(req.body.teacher, (tErr, tData) => {
    if (tErr) {
      if (tErr.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with email ${req.body.teacher}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teacher with email " + req.body.teacher
        });
      }
    } else {
      Student.findStudentsByEmails(req.body.students, (sErr, sData) => {
        if (sErr) {
          if (sErr.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with email ${req.body.students}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Student with email " + req.body.students
            });
          }
        } else {
          const registrations = [];
          sData.forEach(s => {
            // registrations.push([tData.id, s.id]);
            registrations.push({ 'teacher_fk': tData.id, 'student_fk': s.id});
            console.log('Create Registration: { student: ' + s.id + ', teacher: ' + tData.id + ' }');
          });
          // res.send({ message: "Registered students to teacher successfully." });
          Registration.checkAndRegistrations(registrations, (rErr, rData) => {
            if (rErr) {
              res.status(500).send({ message: rErr.message || "Some error occurred while creating the Teacher." });
            } else {
              console.log('Successful Registrations: ', rData);
              res.send({ message: "Registered students to teacher successfully." });
            }
          });
        }
      });
    }
  });
};

/**
 * The below controller function is the endpoint for getting the common students for the selected teachers
 * 
 * @author gmone
 */
exports.findCommonStudents = (req, res) => {
  // Validate request
  console.log(req.query);
  if (!req.query.teacher) {
    res.status(400).send({ message: "the query param is missing." });
  }
  let teachers = [];
  if (!Array.isArray(req.query.teacher)) {
    teachers.push(req.query.teacher);
  } else {
    teachers = req.query.teacher;
  }
  Registration.getCommonStudents(teachers, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Common students not found for teachers with email ${teachers}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teacher with email " + req.body.teacher
        });
      }
    } else {
      const emails = data.map(d => d.email);
      res.send({ students: emails });
    }
  });
};

/**
 * The below controller function is the endpoint for getting the common students for the selected teachers
 * 
 * @author gmone
 */
exports.suspendStudent = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Teacher.suspendStudentByEmail(req.body.student, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error updating the status of the student with email " + req.body.student
      });
    } else {
      console.log('Successful suspension of the student: ', data);
      res.send({ message: `The student with email [${data.email}] is suspended successfully.` });
    }
  });
};

/**
 * The below controller function is the endpoint for retrieving the recipients for notifications by the teacher
 * 
 * @author gmone
 */
exports.retrieveRecipients = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  const teacher = req.body.teacher;
  let emails = req.body.notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  if (!Array.isArray(emails)) {
    emails = [''];
  }
  // emails.forEach(e => console.log(e));

  Teacher.retrieveRecipients({ teacher: teacher, emails: emails}, (err, data) => {
    if (err) {
      if (err.student === "not_found") {
        res.status(404).send({
          message: `recipients list not found for teachers with email ${teacher}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving the recipients list for the teacher with email " + teacher
        });
      }
    } else {
      const recipients = data.map(d => d.email).concat(...emails).filter(r => r !== '');
      res.send({ recipients: recipients });
    }
  });
};

function extractEmails ( text ){
	return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}