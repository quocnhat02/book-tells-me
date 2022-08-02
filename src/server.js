import express from "express";
import "dotenv/config";
import initRouter from "./routes/index";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using view engine
viewEngine(app);

// Connect to DB
connectDB();

// Init routes
initRouter(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
