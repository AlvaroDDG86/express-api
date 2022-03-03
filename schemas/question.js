const { Schema, model } = require("mongoose")

const questionSchema = new Schema({
    id: Number,
    title: String
})

const quizSchema = new Schema({
    quizId: Number,
    list: [questionSchema]
});

const Question = model("Question", quizSchema);

module.exports = Question