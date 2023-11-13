const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    image: String
})


const Post = mongoose.model('post',postSchema,'post')
module.exports = Post
