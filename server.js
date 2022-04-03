const cookieSession = require("cookie-session");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const AccountRouter = require("./routes/account");
const ApiRouter = require("./routes/api");

const MONGO_URI =
  "mongodb+srv://kashyap456:c9blaber@cluster0.ppm6c.mongodb.net/cw-lite?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["pineapple"],
    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    maxAge: 10 * 1000,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/account", AccountRouter);
app.use("/api/questions", ApiRouter);

app.listen(3000, () => {
  console.log("listening on 3000");
  console.log("mongoDB is connected");
});
