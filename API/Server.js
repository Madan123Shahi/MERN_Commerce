import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/ConnectDB.js";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json(`Server is at PORT ${PORT}`);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
