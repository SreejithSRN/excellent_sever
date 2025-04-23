"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../presentation/controllers");
const roleAuth_1 = require("../../_lib/middleware/roleAuth");
const entities_1 = require("../../domain/entities");
const routes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { addCategory, getCategories, blockUnblockCat, addCourse, getCourses, getCoursesById, toggleBlockCourse, assessmentDelete, getTestAssessment, studentAssessmentsList, submitAssessment, getCoursesForInstructor, createEnrollment, getStudentMyCourses, checkEnrollment, getMyCoursesById, instructorAssessmentsList, streamVideo, createAssesment, assessmentList } = (0, controllers_1.controllers)(dependencies);
    router.route("/addCategory").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.admin), addCategory);
    router.route("/getCategories").get((0, roleAuth_1.roleAuthMiddleware)(), getCategories);
    router.route("/blockUnblockCat").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.admin), blockUnblockCat);
    router.route("/addCourse").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), addCourse);
    router.route("/getCourses").get((0, roleAuth_1.roleAuthMiddleware)(), getCourses); //fetching all courses to show
    router.route("/getCoursesById/:id").get((0, roleAuth_1.roleAuthMiddleware)(), getCoursesById); //fetching courses for purchases
    router.route("/getMyCoursesById/:id").get((0, roleAuth_1.roleAuthMiddleware)(), getMyCoursesById); //video url removed
    router.route("/getCoursesForInstructor").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), getCoursesForInstructor); //fetching the instructor courses
    router.route("/getStudentMyCourses").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), getStudentMyCourses); // video url removed
    router.route("/toggleBlockCourse").put((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), toggleBlockCourse);
    router.route("/createEnrollment").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), createEnrollment);
    router.route("/checkEnrollment").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), checkEnrollment);
    router.route("/streamVideo/:courseId/:lessonId").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), streamVideo);
    router.route("/createAssesment").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), createAssesment);
    router.route("/assessmentList/:id").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), assessmentList);
    router.route("/assessmentDelete/:id").delete((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), assessmentDelete);
    router.route("/getTestAssessment/:id").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), getTestAssessment);
    router.route("/submitAssessment/:id").post((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), submitAssessment);
    router.route("/studentAssessmentsList").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.student), studentAssessmentsList);
    router.route("/instructorAssessmentsList").get((0, roleAuth_1.roleAuthMiddleware)(entities_1.Role.instructor), instructorAssessmentsList);
    return router;
};
exports.routes = routes;
