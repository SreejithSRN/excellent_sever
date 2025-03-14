import { User } from "../models";

export const approveReject = async (
  email: string,
  reason: string
): Promise<boolean | null> => {
  try {
    console.log(email, reason, "iam in the reppoooooooooooo");
    const result = await User.findOne({ email });
    if (!result) {
      console.log("User not found");
      return null;
    }
    result.isRejected = !result.isRejected;
    result.isVerified = !result.isVerified;
    if (reason != "") {
      result.messages = result.messages ?? { rejection: "" };
      result.messages.rejection = reason;
    }else{
      result.messages = { rejection: "" };
      result.messages.rejection = reason
    }
    await result.save();
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
