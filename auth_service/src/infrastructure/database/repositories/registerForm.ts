import { constant } from "../../../_lib/common/constant";
import { User } from "../models";

// export const registerForm = async (data: constant): Promise<boolean | null> => {
//   try {
//     const data1 = {
//       ...data,
//       profile: {
//         avatar:
//           data.avatar ||
//           "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png",
//         dateOfBirth: data.dateOfBirth,
//         gender: data.gender,
//       },
//       contact: {
//         address: data.address,
//         phone: data.phone,
//         social: data.social,
//       },
//     };
//     const updatedUser = await User.findOneAndUpdate(
//       { email: data1.email },
//       {
//         $set: {
//           firstName: data1.firstName,
//           lastName: data1.lastName,
//           name: data1.name,
//           email: data1.email,
//           password: data1.password,
//           role: data1.role,
//           profile: data1.profile,
//           contact: data1.contact,
//           profession: data1.profession,
//           cv: data1.cv,
//           isOtpVerified: true,
//           isVerified: data1.isVerified,
//           isBlocked: data1.isBlocked,
//           isRequested: data1.isRequested,
//           isGAuth: data1.isGAuth,
//           isRejected: data1.isRejected,
//           lastLoginDate: data1.lastLoginDate,
//           loginStreak: data1.loginStreak,
//           weeklyLogins: data1.weeklyLogins,
//         },
//       },
//       {
//         upsert: true, // Create document if it doesn't exist
//         runValidators: true, // Validate data against schema
//         new: true,
//       }
//     );

//     console.log(
//       updatedUser,
//       "this is waiting .....................djnjkdbjfkj"
//     );

//     if (updatedUser) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error(error.message);
//       throw error;
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };


export const registerForm = async (data1: constant): Promise<boolean | null> => {
  try {


    
    // Prepare the data object, mapping input fields correctly
    // const data1 = {
    //   ...data,
    //   profile: {
    //     avatar:
    //       data.avatar ||
    //       "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png",
    //     dateOfBirth: data.dateOfBirth || "",
    //     gender: data.gender || "",
    //   },
    //   contact: {
    //     address: data.address || "",
    //     phone: data.phone || "",
    //     social: {
    //       linkedin: data.social?.linkedin || "",
    //       github: data.social?.github || "",
    //       instagram: data.social?.instagram || "",
    //     },
    //   },
    // };
    console.log(data1,"sukallleeee moneeeeeeeeeeeeeeeeeeeeeeeeeee")

    // Use findOneAndUpdate to update or insert the user
    const updatedUser = await User.findOneAndUpdate(
      { email: data1.email }, // Match user by email
      {
        $set: {
          firstName: data1.firstName,
          lastName: data1.lastName,
          name: data1.name,
          email: data1.email,
          password: data1.password,
          role: data1.role,
          profile: data1.profile,
          contact: data1.contact,
          profession: data1.profession,
          qualification: data1.qualification,
          cv: data1.cv,
          isOtpVerified: true,
          isVerified: data1.isVerified,
          isBlocked: data1.isBlocked,
          isRequested: data1.isRequested,
          isGAuth: data1.isGAuth,
          isRejected: data1.isRejected,
          lastLoginDate: data1.lastLoginDate,
          loginStreak: data1.loginStreak,
          weeklyLogins: data1.weeklyLogins,
        },
      },
      {
        upsert: true, // Create a new document if no match is found
        runValidators: true, // Ensure data matches schema validation
        new: true, // Return the updated document
      }
    );

    console.log(
      updatedUser,
      "this is waiting .....................djnjkdbjfkj"
    );

    // Return success status based on the operation
    return updatedUser ? true : false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during registerForm:", error.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};


