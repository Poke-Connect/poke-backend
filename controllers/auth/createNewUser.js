import User from "../../models/User.js";

export const createNewUser = (name, email, picture) => {
  const nameArr = name.split(" ");
  const newUser = new User({
    firstName: nameArr[0],
    lastName: nameArr[nameArr.length - 1],
    displayName: name,
    photoURL: picture,
    email,
  });
  return newUser;
};
