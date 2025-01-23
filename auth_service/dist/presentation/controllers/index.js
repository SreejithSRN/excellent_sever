"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const approveReject_1 = require("./approveReject");
const blockUnblock_1 = require("./blockUnblock");
const getInstructors_1 = require("./getInstructors");
const getStudents_1 = require("./getStudents");
const getUserData_1 = require("./getUserData");
const login_1 = require("./login");
const logout_1 = require("./logout");
const passwordChange_1 = require("./passwordChange");
const profileEdit_1 = require("./profileEdit");
const profileImageEdit_1 = require("./profileImageEdit");
const registerForm_1 = require("./registerForm");
const resentOtp_1 = require("./resentOtp");
const signup_1 = require("./signup");
const verifyOtp_1 = require("./verifyOtp");
const controllers = (dependencies) => {
    return {
        signup: (0, signup_1.signupController)(dependencies),
        verifyOtp: (0, verifyOtp_1.verifyOtpController)(dependencies),
        resentOtp: (0, resentOtp_1.resendOtpController)(dependencies),
        login: (0, login_1.loginUserController)(dependencies),
        getUserData: (0, getUserData_1.getUserDataController)(dependencies),
        logout: (0, logout_1.logoutController)(dependencies),
        getStudents: (0, getStudents_1.getStudentsController)(dependencies),
        getInstructors: (0, getInstructors_1.getInstructorsController)(dependencies),
        blockUnblock: (0, blockUnblock_1.blockUblockController)(dependencies),
        approveReject: (0, approveReject_1.approveRejectController)(dependencies),
        registerForm: (0, registerForm_1.registerFormController)(dependencies),
        profileEdit: (0, profileEdit_1.profileEditController)(dependencies),
        passwordChange: (0, passwordChange_1.passwordChangeController)(dependencies),
        profileImageEdit: (0, profileImageEdit_1.profileImageEditController)(dependencies)
    };
};
exports.controllers = controllers;
