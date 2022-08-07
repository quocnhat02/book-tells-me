import express from "express";
import "dotenv/config";
import initRouter from "./routes/index";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import methodOverride from "method-override";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using methodOverride
app.use(methodOverride("_method"));

// Using view engine
viewEngine(app);

// Connect to DB
connectDB();

// Init routes
initRouter(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
