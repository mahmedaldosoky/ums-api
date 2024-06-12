import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/students", studentRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from House Point!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8000, () =>
      console.log("Server has started on port http://localhost:8000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
