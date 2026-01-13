const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("process.env.MONGO_URL")
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    email: String,
    password: String
}));

const Post = mongoose.model("Post", new mongoose.Schema({
    author: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
}));

app.post("/signup", async(req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.post("/post", async(req, res) => {
    const post = await Post.create(req.body);
    res.json(post);
});

app.get("/feed", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts)
});

app.listen(5000, () => console.log("Server running on port 5000"));