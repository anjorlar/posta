const mongoose = require('mongoose')
const postId_1 = mongoose.Types.ObjectId("5feb486057044ad25c5aa459")
const postId_2 = mongoose.Types.ObjectId("5feb48bb57044ad25c5aa45b")

exports.posts = [
    {
        _id: postId_1,
        id: 997,
        title: "first test",
        text: " first the test",
        country_id: "+234",
        language_id: 21
    },
    {
        _id: postId_2,
        id: 2,
        title: "second test",
        text: "the test",
        country_id: "+222",
        language_id: 21
    },
]