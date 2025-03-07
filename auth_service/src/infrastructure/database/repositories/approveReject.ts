import { User } from "../models";

export const approveReject = async (email: string): Promise<boolean | null> => {
  try {
    const result = await User.findOne({ email });
    if (!result) {
      console.log("User not found");
      return null;
    }
    result.isRejected = !result.isRejected;
    result.isVerified = !result.isVerified;
    await result.save();
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
