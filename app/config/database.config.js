import mongoose from "mongoose";
import User from "../model/UserModel/user.model.js"
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
	const connectionParams = { useNewUrlParser: true };
	mongoose.connect(process.env.DB, connectionParams);

	mongoose.connection.on("connected", async () => {
		console.log("Connected to database sucessfullyy");
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash('201513119T@m', salt);

		const adminUser = new User({
			userName: 'admin',
			email: 'admin@admin.com',
			password: hashPassword,
			roles: ['admin']
		});
		try {
			const existingUser = await User.findOne({ email: adminUser.email });
			console.log(adminUser.email);
			console.log(existingUser);
			if (!existingUser) {
				await adminUser.save();
				console.log('Admin user created successfully');
			} else {
				console.log('Admin user already exists');
			}
		} catch (err) {
			console.error(err);
		}
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error while connecting to database :" + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongodb connection disconnected");
	});
};

export default dbConnect;
