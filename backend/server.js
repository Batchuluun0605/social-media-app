import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDb from "./db/connectMongoDb.js";

dotenv.config();

connectMongoDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running port: ${PORT} `);
});
