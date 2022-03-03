const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 3030;

// Cors
app.use(cors());
// DB
const db = require("./db/quiz.json");
const Quiz = require("./schemas/quiz");
const Question = require("./schemas/question");
const Answers = require("./schemas/answers");

app.get("/api/quizzes", (_, response) => {
  Quiz.find({}, (err, quizzes) => {
    if (err) {
      response.status(500).send("Internal Error");
    } else if (quizzes.length === 0) {
      response.status(404).send("Quizzes not found");
    } else {
      response.send(quizzes);
    }
  });
  //   response.json(db.quizzes);
});
app.get("/api/questions", (request, response) => {
  const { quizId } = request.query;
  if (typeof quizId === "undefined") {
    response.status(400).send("quizId is required");
  } else {
    Question.find({ quizId }, { list: 1, _id: 0 }, (err, questions) => {
      if (err) {
        response.status(500).send("Internal Error");
      } else if (questions.length === 0) {
        response.status(404).send("Questions not found");
      }
      response.send(questions[0]);
    });
  }
});
app.get("/api/answers", (request, response) => {
  const { quizId, questionId } = request.query;
  if (typeof quizId === "undefined") {
    response.status(400).send("quizId is required");
  }
  else if (typeof questionId === "undefined") {
    response.status(400).send("questionId is required");
  } else {
    Answers.find({ quizId, "answers.questionId": questionId }, {answers: 1}, (err, answers) => {
      if (err) {
        response.status(500).send("Internal Error");
      } else if (answers.length === 0) {
        response.status(404).send("Answers not found");
      }
      response.send(answers[0]);
    });
  }
});
app.get("/api/answer", (request, response) => {
  const { quizId, questionId } = request.query;
  if (typeof quizId === "undefined") {
    response.status(400).send("quizId is required");
  } else if (typeof questionId === "undefined") {
    response.status(400).send("questionId is required");
  } else {
    const answer = db.answer[quizId.toString()][questionId.toString()];
    if (!answer) {
      response.status(404).send("Answer not found");
    }
    
    response.json(answer);
  }
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to mongoDB");
  }
);
app.listen(PORT, () => console.log("Server is running in port " + PORT));
