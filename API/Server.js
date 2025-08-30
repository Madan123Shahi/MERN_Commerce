import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/ConnectDB.js";
import UserRoute from "./Routes/User.Route.js";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.use("/api", UserRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
