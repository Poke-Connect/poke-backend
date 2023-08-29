import User from "../../models/User.js";

export const createNewUser = async (name, email, picture) => {
  try {
    const nameArr = name.split(" ");
    const newUser = new User({
      firstName: nameArr[0],
      lastName: nameArr[nameArr.length - 1],
      displayName: name,
      photoURL: picture,
      email,
    });

    const savedUser = await newUser.save(); // Save the user to the database
    return savedUser;
  } catch (error) {
    throw new Error("Failed to create and save new user: " + error.message);
  }
};
