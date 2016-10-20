"use strict";

// dependencies from node
const path = require('path');

// dependencies from npm
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

// Initialize our app
const app = express();


const courseInfo = {
  courseTitle: 'Express 101',
  courseMessage: 'Please check-in using the form below.',
  courseStudents: [
    {name: Matt,
    attendance: 4},
    {name: Joe,
    attendance: 2}
  ]
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
  console.log(req.body.name);

  if (courseInfo.courseStudents.name.indexOf(req.body.name) > -1) {
    courseInfo.courseStudents[indexOf(req.body.name)].attendance++;
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
