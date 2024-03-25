import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
	logInBodyValidation,
	signUpBodyValidation,
	refreshTokenBodyValidation
} from "../../utils/validationSchema.util.js"
import User from "../../model/UserModel/user.model.js"
import UserToken from "../../model/UserModel/userToken.model.js"
import generateTokens from "../../utils/generateTokens.util.js"
import verifyRefreshToken from "../../utils/verifyRefreshToken.util.js"


export const signUp = async (req, res) => {
	try {
		const { error } = signUpBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(400)
				.json({ error: true, message: "User with given email already exist" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();

		res
			.status(201)
			.json({ error: false, message: "Account created sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}

export const logIn = async (req, res) => {
	try {
		const { error } = logInBodyValidation(req.body);
		if (error)
		return res
				.status(400)
				.json({ error: true, message: error.details[0].message });
				
		const user = await User.findOne({ email: req.body.email });
		if (!user)
		return res
	.status(401)
	.json({ error: true, message: "Invalid email" });

	console.log('logIn',req.body.password, user.password);


		const verifiedPassword = await bcrypt.compareSync(
			
			req.body.password, user.password
		);
		if (!verifiedPassword)
			return res
				.status(401)
				.json({ error: true, message: "Invalid password" });

		const { accessToken, refreshToken } = await generateTokens(user);

		res.status(200).json({
			error: false,
			accessToken,
			refreshToken,
			message: "Logged in sucessfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}

export const logOut = async (req, res) => {
	 try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await userToken.deleteOne();
    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const refresh=  async (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      console.log("tokenDetails");
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "14m" }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json("errrrrrrrrrrrrr"));
};


