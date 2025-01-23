import { constant } from "../../_lib/common/constant";
import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const registerFormUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  const { registerForm } = repositories;
  return {
    execute: async (data: UserEntity) => {
      try {
        const result = await registerForm(data);
        return true
      } catch (error: constant) {
        throw new Error(error?.message || "Error in checking with name");
      }
    },
  };
};
