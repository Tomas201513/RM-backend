import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./app/config/database.config.js"
import assetRoutes from "./app/routes/asset.routes.js"
import authRoutes from "./app/routes/auth.routes.js"
import budgetRoutes from "./app/routes/budget.routes.js"
import catagoryRoute from "./app/routes/catagory.routes.js"
import departmentRoutes from "./app/routes/department.routes.js"
import itRouter from "./app/routes/it.routes.js"
import officeRoutes from "./app/routes/office.routes.js"
import projectRoutes from "./app/routes/project.routes.js"  
import subCatagoryRoute from "./app/routes/subCatagory.routes.js"
import userRoute from "./app/routes/user.routes.js"
import positionRoute from "./app/routes/position.routes.js"
import connRoute from "./app/routes/conn.routes.js"
import countryRoute from "./app/routes/country.route.js"
import senarioRoute from "./app/routes/senario.routes.js"



const app = express();
config();
dbConnect();

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/assets", assetRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/positions", positionRoute);
app.use("/api/catagories", catagoryRoute);
app.use("/api/subCatagories", subCatagoryRoute);
app.use("/api/its", itRouter);
app.use("/api/conn", connRoute);
app.use("/api/country", countryRoute)
app.use("/api/procurement", senarioRoute)




app.listen(process.env.PORT  , () => console.log(`Listening on port ${process.env.PORT || 5000}`));
