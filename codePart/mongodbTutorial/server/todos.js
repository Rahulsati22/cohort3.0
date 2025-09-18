const { default: mongoose, Schema, model } = require("mongoose");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
    }

}, { timestamps: true })

const Todo = model('Todo', todoSchema)
module.exports = Todo