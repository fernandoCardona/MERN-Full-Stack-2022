//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const CourseController = require('../controllers/Courses');
const md_auth = require('../middlewaares/authenticated');

const md_upload = multiparty({uploadDir: './uploads/course'});

const api = express.Router();

//MENU ENDPOIND :
api.post('/course', [ md_auth.asureAuth, md_upload ], CourseController.createCourse);
api.get('/courses', CourseController.getCourses);
api.patch('/course/:id', [ md_auth.asureAuth,md_upload ], CourseController.updateCourse);
api.delete('/course/:id', [md_auth.asureAuth], CourseController.deleteCourse);

module.exports = api;