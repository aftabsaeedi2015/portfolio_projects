const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    classes: [
        {
            class: String,
            start_date: String
        }
    ],
    plan: {
        tier: String,
        start_date: String,
        end_date: String
    },
    is_admin: Boolean
}
);
const User = mongoose.model('user',userSchema,'user')
module.exports = User
