import User from "../models/User.js";

export const updateNewConnections = async (userId, connectionId) => {
  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          newConnections: connectionId,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  } catch (error) {
    console.log("error"), error;
  }
};
