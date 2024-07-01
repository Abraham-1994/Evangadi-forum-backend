import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UseContext";
import axios from "axios";
import QuestionList from "../Question/QuestionList";
// import QuestionList from "../Question/QuestionList";

const AnswerQuestion = (props) => {
  let { questionId } = useParams();
  const [{ user, token }] = useContext(UserContext);
  const [answer, setAnswer] = useState({});
  const [prevAnswers, setPrevAnswers] = useState([]);
  const [error, setError] = useState(null);
  // Get access to the data on state
  const location = useLocation();
  const { question, currentUserId } = location.state;
  const handleChange = (e) => {
    setAnswer({
      answer: e.target.value,
      questionId: question.question_id,
      userId: currentUserId,
    });
  };
  // console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const answerRes = await axios.post("http://localhost:5000/api/Answers", {
        answer: answer.answer,
        questionId: questionId,
        user_id: user.id,
      });
      console.log("Answer submitted:", answerRes);
      window.location.reload(false);
    } catch (error) {
      console.log("Answers can't be submitted: ", error);
    }
  };
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const answers = await axios.get(
          `http://localhost:5000/api/answers/${questionId}`
        );
        setPrevAnswers(answers.data?.data);
      } catch (err) {
        console.log("Can't fetch answers:", err);
      }
    };
    fetchAnswers();
  }, [questionId]);
  return (
    <div className="relative top-4 p-8">
      <div className="p-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <p className="text-xl font-semibold">Question</p>
          <p className="text-sm font-medium">{question?.question}</p>
          <p className="text-xs pb-6">{question?.question_description}</p>
        </div>
        <div className="mb-4">
          {prevAnswers?.length !== 0 && (
            <h2 className="text-xl font-semibold ">
              Answers From the Community
            </h2>
          )}
        </div>
        <div className="answer-list">
          {prevAnswers?.map((prevAnswer, index) => (
            <div key={prevAnswer.answerId || index} className="mb-4">
              {/* {prevAnswer.answer} */}
              <QuestionList show={prevAnswer} />
              {/* {prevAnswer.user_name} */}
            </div>
          ))}
        </div>
      </div>
      <div className="my-8 p-4 bg-white rounded shadow-md">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold">Answer The Question</p>
        </div>
        <div className="text-center mb-4">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-500 hover:text-orange-500"
          >
            Go to Question page
          </Link>
        </div>
        <div className="answer-form">
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              name="answerField"
              placeholder="Your Answer ..."
              className="border border-gray-300 rounded-xl w-full h-28 p-2 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600">
              Post your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AnswerQuestion;
