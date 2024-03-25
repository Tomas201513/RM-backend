import UserToken from "../model/UserModel/userToken.model.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
  try {
    const doc = await UserToken.findOne({ token: refreshToken });

    if (!doc) {
      throw new Error("Invalid refresh token");
    }

    const tokenDetails = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (err) {
    throw {
      error: true,
      message: err.message,
    };
  }
};

export default verifyRefreshToken;
