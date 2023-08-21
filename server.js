const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config({ path: "./config/.env" });
const User = require("./models/user");
const router = express.Router();

const app = express();

connectDB();

app.use("/api", router);
router.use(express.json());

//Get
router.get("/user", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json({ messeges: "Get all users", result: Users });
  } catch (error) {
    console.log(error);
    res.status(504).json({ Error: error });
  }
});

//Post
router.post("/user", async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    const user = await newUser.save();
    res.status(201).json({ messeges: "User saved", result: user });
  } catch (error) {
    console.log(error);
    res.status(504).json({ Error: error });
  }
});

//Put
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $set: { name: name } });
    res.status(200).json({ messege: "User Updated" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

//Delete
router.delete("/user/:id", async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).json({ messege: "User removed" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  });

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is runing on ${PORT}`);
});
