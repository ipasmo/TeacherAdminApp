-- Database setup for TeacherApp
CREATE DATABASE IF NOT EXISTS `TeacherApp`;

USE `TeacherApp`;

-- Table design for TeacherApp.teacher
CREATE TABLE `teacher` (
`id` int(11) AUTO_INCREMENT,
`name` varchar(100),
`email` varchar(200),
PRIMARY KEY (`id`)
) AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Table design for TeacherApp.student
CREATE TABLE `student` (
`id` int(11) AUTO_INCREMENT,
`name` varchar(100),
`email` varchar(200),
`suspended` BOOLEAN,
PRIMARY KEY (`id`)
) AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Table design for TeacherApp.registration
CREATE TABLE `registration` (
`id` int(11) AUTO_INCREMENT,
`teacher_fk` int(11),
`student_fk` int(11),
PRIMARY KEY (`id`)
) AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;


-- Test data for table TeacherApp.teacher
INSERT INTO `teacher` (`id`, `name`, `email`) VALUES
(1, 'Ken', 'teacherken@gmail.com'),
(2, 'Ben', 'teacherben@gmail.com'),
(3, 'Chen', 'teacherchen@gmail.com');

-- Test data for table TeacherApp.student
INSERT INTO `student` (`id`, `name`, `email`, `suspended`) VALUES
(1, 'Jon', 'studentjon@gmail.com', false),
(2, 'Hon', 'studenthon@gmail.com', false),
(3, 'Mary', 'studentmary@gmail.com', false),
(4, 'Agnes', 'studentagnes@gmail.com', false),
(5, 'Miche', 'studentmiche@gmail.com', false),
(6, 'Bob', 'studentbob@gmail.com', false),
(7, 'Jack', 'commonstudent1@gmail.com', false),
(8, 'Jill', 'commonstudent2@gmail.com', false),
(9, 'Boris', 'student_only_under_teacher_ken@gmail.com', false);

