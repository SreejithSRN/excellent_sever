import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import {
  validatePasswordMiddleware,
  validateConfirmPasswordMiddleware,
  validateEmailMiddleware,
  validateUserNameMiddleware,
  validatefirstNameMiddleware,
} from "../../_lib/middleware/validate";
import { jwtMiddleware } from "../../_lib/middleware/jwt";

export const routes = (dependencies: IDependencies) => {
  const {
    signup,
    verifyOtp,
    resentOtp,
    login,
    getUserData,
    logout,
    getStudents,
    getInstructors,
    blockUnblock,
    approveReject,
    registerForm,
    profileEdit,
    passwordChange,
    profileImageEdit
  } = controllers(dependencies);

  const router = Router();
  router
    .route("/signup")
    .post(
      validateEmailMiddleware,
      validateUserNameMiddleware,
      validatePasswordMiddleware,
      validateConfirmPasswordMiddleware,
      signup
    );
  router.route("/verifyOtp").post(verifyOtp);
  router.route("/resentOtp").post(resentOtp);
  router
    .route("/login")
    .post(validateEmailMiddleware, validatePasswordMiddleware, login);
  router.route("/getUserData").get(jwtMiddleware, getUserData);
  router.route("/logout").delete(logout);
  router.route("/getStudents").get(getStudents);
  router.route("/getInstructors").get(getInstructors);
  router.route("/blockUnblock").post(blockUnblock);
  router.route("/approveReject").post(approveReject);
  router.route("/registerForm").post(validatefirstNameMiddleware, registerForm);
  router.route("/profileEdit").post(profileEdit);
  router.route("/passwordChange").post(passwordChange);
  router.route("/profileImageEdit").put(profileImageEdit);

  return router;
};
