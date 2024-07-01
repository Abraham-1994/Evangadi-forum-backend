import React from "react";
import { MdAccountCircle } from "react-icons/md";
function QuestionList({ show }) {
  return (
    <div className="question-list-container">
      <div className="question-list-user">
        <MdAccountCircle className="question-list-icon" />
        <span className="question-list-username">{show?.user_name}</span>
      </div>
      <div className="question-list-content">
        <p className="question-list-text">
          {show?.question ||
            show?.answer ||
            "['the question/answer goes here]'?"}
        </p>
      </div>
    </div>
  );
}
export default QuestionList;
