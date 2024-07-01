import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UseContext";
import { useNavigate, Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import QuestionList from "../Question/QuestionList";

const Home = ({ logout }) => {
  const [userData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData || !userData.user) {
      navigate("/login");
      return;
    }
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/questions/all"
        );
        setAllQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [userData, navigate]);
  return (
    <div className="bg-gray-100 pt-4 min-h-screen">
      <div className="bg-white shadow-md">
        <div className="flex justify-between items-center pt-4 pr-16 pl-[100px]">
          <button
            onClick={() => navigate("/askquestion")}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-orange-400 ml-4 text-sm flex items-center"
          >
            Ask Question
          </button>
          <h4 className="text-xl font-medium">
            Welcome: {userData.user?.display_name}
          </h4>
        </div>
        <h3 className="text-xl font-medium pl-28 pt-4">Questions</h3>

        <div className="mt-4 divide-y divide-slate-400/[.24]">
          {allQuestions?.map((question) => (
            <div key={question.question_id} className="mb-4">
              <Link
                to={`/answer/${question.question_id}`}
                state={{
                  question: question,
                  currentUserId: userData.user?.id,
                }}
                className="text-gray-500 hover:underline flex items-center justify-between px-28"
              >
                <QuestionList show={question} />
                <MdArrowForwardIos className="text-gray-500" />
              </Link>
              <div></div>
            </div>
          ))}
        </div>
        {allQuestions.length < 3 && <div className="mt-4" />}
      </div>
    </div>
  );
};
export default Home;
