import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UseContext";
import "../../App.css";
function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log("test");
  console.log(form);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/questions/", {
        question: form.question,
        question_description: form.question_description,
        user_id: userData.user.id,
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting the question", error);
    }
  };
  return (
    <div className="ask-question-container">
      <div className="ask-question-steps">
        <div>
          <p className="ask-question-title">Steps to write a good question</p>
          <ul className="ask-question-list">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
      </div>
      <div className="ask-question-form-container">
        <h1 className="ask-question-form-title">Ask a Question</h1>
        <Link to="/all-questions">
          <p className="ask-question-link">Go to Question page</p>
        </Link>
        <form onSubmit={handleSubmit} className="ask-question-form">
          <div className="ask-question-input-group">
            <input
              type="text"
              id="question"
              name="question"
              placeholder="Title"
              onChange={handleChange}
              required
              className="ask-question-input"
            />
          </div>
          <div className="ask-question-input-group">
            <textarea
              name="question_description"
              placeholder="Question Description"
              onChange={handleChange}
              required
              className="ask-question-textarea"
            />
          </div>
          <button type="submit" className="ask-question-button">
            Ask Question
          </button>
        </form>
      </div>
    </div>
  );
}
export default AskQuestion;
