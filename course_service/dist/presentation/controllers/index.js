"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const assesment_1 = require("./assesment");
const category_1 = require("./category");
const index_1 = require("./courses/index");
const enrollment_1 = require("./enrollment");
const controllers = (dependencies) => {
    return {
        addCategory: (0, category_1.addCategoryController)(dependencies),
        getCategories: (0, category_1.getCategoriesController)(dependencies),
        blockUnblockCat: (0, category_1.blockUnblockCatController)(dependencies),
        addCourse: (0, index_1.addCourseController)(dependencies),
        getCourses: (0, index_1.getCoursesController)(dependencies),
        getCoursesById: (0, index_1.getCoursesByIdController)(dependencies),
        getMyCoursesById: (0, index_1.getMyCoursesByIdController)(dependencies),
        getCoursesForInstructor: (0, index_1.getCoursesForInstructorController)(dependencies),
        getStudentMyCourses: (0, index_1.getStudentMyCoursesController)(dependencies),
        toggleBlockCourse: (0, index_1.toggleBlockCourseController)(dependencies),
        createEnrollment: (0, enrollment_1.addEnrollmentController)(dependencies),
        checkEnrollment: (0, index_1.checkEnrollmentController)(dependencies),
        streamVideo: (0, index_1.streamVideoController)(dependencies),
        createAssesment: (0, assesment_1.createAssesmentController)(dependencies),
        assessmentList: (0, assesment_1.assessmentListController)(dependencies),
        assessmentDelete: (0, assesment_1.assessmentDeleteController)(dependencies),
        getTestAssessment: (0, assesment_1.getTestAssessmentController)(dependencies),
        submitAssessment: (0, assesment_1.submitAssessmentController)(dependencies),
        studentAssessmentsList: (0, assesment_1.studentAssessmentsListController)(dependencies),
        instructorAssessmentsList: (0, assesment_1.instructorAssessmentsListController)(dependencies),
    };
};
exports.controllers = controllers;
