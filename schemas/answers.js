const { Schema, model } = require("mongoose")

const answerSchema = new Schema({
    id: Number,
    title: String
})

const answerListSchema = new Schema({
    quiestionId: Number,
    list: [answerSchema]
})

const answersSchema = new Schema({
    quizId: Number,
    answers: [answerListSchema]
});

const Answers = model("Answers", answersSchema);

module.exports = Answers