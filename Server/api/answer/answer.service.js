const pool = require("../../Config/dbConfig");

module.exports = {
  addAnswer: (data, callback) => {
    pool.query(
      `INSERT INTO answer (answer, question_id, user_id) VALUES (?, ?, ?)`,
      [data.answer, data.questionId, data.user_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getAnswers: (questionID, callback) => {
    console.log(questionID);
    pool.query(
      `SELECT answer_id, answer, question_id, registration.user_id, registration.user_name
       FROM answer
       LEFT JOIN registration ON answer.user_id = registration.user_id
       WHERE answer.question_id = ?`,
      [questionID],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
