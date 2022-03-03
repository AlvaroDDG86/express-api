const { Schema, model } = require("mongoose")

const quizSchema = new Schema({
    id: Number,
    title: String
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz