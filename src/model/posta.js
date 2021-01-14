const mongoose = require('mongoose')

const postaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    text: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    date: {
        type: String,
    },
    country_id: {
        type: String,
        required: true,
    },
    language_id: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const posta = mongoose.model('Posta', postaSchema)
module.exports = posta