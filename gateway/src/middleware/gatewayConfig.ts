import { Role } from "../entity/UserEntity";

export const gatewayRoutes = [
  { path: "/api/course/addCategory", role: Role.admin,service: process.env.COURSE_SERVICE!,},
  { path: "/api/course/getCategories",role: undefined,service: process.env.COURSE_SERVICE!,},  
  
];


  
    