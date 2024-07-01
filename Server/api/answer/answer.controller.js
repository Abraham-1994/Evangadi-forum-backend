const { getAnswers, addAnswer } = require("./answer.service");

module.exports = {
  createAnswer: (req, res) => {
    const { answer, questionId, user_id } = req.body;
    console.log("createAnswer request body:", req.body);

    if (!answer || !questionId) {
      console.log("ERROR: Missing answer or questionId");
      return res
        .status(400)
        .json({ msg: "ERROR: Please provide an answer in the answer field." });
    }

    addAnswer(req.body, (err, results) => {
      if (err) {
        console.log("ERROR: at createAnswer:addAnswer", req.body);
        console.log(err);
        return res
          .status(500)
          .json({ msg: "ERROR: adding the answer: database connection err" });
      }
      console.log("Success: New answer added", results);
      return res
        .status(200)
        .json({ msg: "New answer is added successfully", data: results });
    });
  },

  readAnswers: (req, res) => {
    console.log("readAnswers request params:", req.params.questionId);

    getAnswers(req.params.questionId, (err, results) => {
      if (err) {
        console.log("ERROR: at readAnswers:getAnswers", req.params.questionId);
        console.log(err);
        return res
          .status(500)
          .json({ msg: "ERROR: getting the answers: database connection err" });
      }
      console.log("Success: Answers retrieved", results);
      return res
        .status(200)
        .json({ msg: "The answers are imported successfully", data: results });
    });
  },
};
