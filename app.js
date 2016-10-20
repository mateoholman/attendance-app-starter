"use strict";

// dependencies from node
const path = require('path');

// dependencies from npm
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

// Initialize our app
const app = express();

// Setup a course object
let courseInfo = {
  courseTitle: 'Express 101',
  courseMessage: 'Please check-in using the form below.',
  courseStudents: [
    {name: 'Matt',
    attendance: 4},
    {name: 'Joe',
    attendance: 2}
  ]
}

// Create a function to find out if a student is already registered
// for the current course.
function findStudentIndex(studentName) {
  for (var i = 0; i < courseInfo.courseStudents.length; i++) {
    if (courseInfo.courseStudents[i].name === studentName){
      return i;
    }
  }
}

// Set our views directory
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
  res.render('index.ejs', {
    courseInfo
  });
});

app.post('/', function(req, res, next) {

  let studentIndex = findStudentIndex(req.body.name);

  if (studentIndex !== undefined) {
    courseInfo.courseStudents[studentIndex].attendance++;
  }
  else {
    let newStudent = {
      name: req.body.name,
      attendance: 1
    };
    courseInfo.courseStudents.push(newStudent);
  }

  res.redirect('/');
});


// Set up our server
const port = 3000;
app.listen(port, () => console.log(`Server listening on: ${port}`));
