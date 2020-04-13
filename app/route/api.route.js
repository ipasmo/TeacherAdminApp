module.exports = app => {
  const teachers = require("../controller/teacher.controller.js");

  // Register the students with the teacher
  app.post("/api/register", teachers.registerStudents);
    
  // Retrieve all common students
  app.get("/api/commonstudents", teachers.findCommonStudents);

  // Suspend the student
  app.post("/api/suspend", teachers.suspendStudent);

  // Retrieve the recipients for notifications
  app.post("/api/retrievefornotifications", teachers.retrieveRecipients);

};