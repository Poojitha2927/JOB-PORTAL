import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from "./src/db/connectDB.js";
import userRoutes from "./src/routes/userRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import Cloudinary from "./src/utils/cloudinary.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// ✅ Fix: Allow frontend to call backend
app.use(
  cors({
    origin: "https://frontend-yydz.onrender.com", // 🔁 Replace with your deployed frontend URL
    credentials: true,
  })
);

// ✅ Connect to database and cloudinary
connectDB();
Cloudinary();

// ✅ Test route
app.get("/", (req, res) => res.send("API is working"));

// ✅ Routes
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server is running on port ${PORT}`));
