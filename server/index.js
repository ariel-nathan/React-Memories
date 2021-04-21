import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//Routers
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello! Welcome to the React Memories App");
});

const PORT = process.env.PORT || 5000;

//JSON Parser
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));
//Cors
app.use(cors());

//Middlewares
app.use("/posts", postRoutes);

//Mongoose
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
