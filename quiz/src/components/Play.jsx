import React, { useEffect, useState } from "react";
import Question from "./Question";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { SocketContext } from "../data/socketContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Leaderboard from "./Leaderboard";
import Timer from "./Timer";
import { decode } from "html-entities";

let answerChosen = false;

function Play() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [nameStudent, setNameStudent] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);  // Add this new state

  useEffect(() => {
    const questionsTest = localStorage.getItem("quizInfo");
    const quizData = JSON.parse(questionsTest);
    const category = quizData.category; // Get category from quiz info
    const isHostUser = localStorage.getItem("isHost") === "true";
    setIsHost(isHostUser);

    const questionsJSONParse = JSON.parse(questionsTest);
    setQuestions(questionsJSONParse.results);
    setNumberOfQuestions(questionsJSONParse.results.length);
    setNameStudent(localStorage.getItem("name"));

    if (socket) {
      socket.on("returnScore", (data) => {
        localStorage.setItem("leaderBoard", JSON.stringify(data));
      });

      // Emit initial score with category
      const initialScore = { 
        name: nameStudent, 
        score: 0,
        category: category 
      };
      socket.emit("studentScore", initialScore);
    } else {
      navigate("/multiplayer");
      //console.log("No socket found");
    }
  }, []);

  useEffect(() => {
    if (quizFinished) {
      // Clean up host flag when game ends
      localStorage.removeItem("isHost");
      // Send final score when quiz is finished
      const finalScore = { name: nameStudent, score: score };
      socket.emit("studentScore", finalScore);
    }
  }, [quizFinished, nameStudent, score, socket]);

  // Modify the timer effect to use the same time value
  useEffect(() => {
    if (!quizFinished && questions.length > 0) {
      // Get time per question from quiz settings
      const quizInfo = JSON.parse(localStorage.getItem('quizInfo'));
      const timePerQuestion = (quizInfo?.timePerQuestion || 15) * 1000; // Convert to milliseconds

      const timer = setTimeout(() => {
        // Reset answer state
        setCanAnswer(true);
        answerChosen = false;

        // Reset button styles
        const answerButtons = document.querySelectorAll(".answer-button");
        answerButtons.forEach((button) => {
          button.classList.remove("btn-success");
          button.classList.remove("btn-danger");
        });

        if (activeQuestionIndex === numberOfQuestions - 1) {
          setQuizFinished(true);
        } else {
          setActiveQuestionIndex(prev => prev + 1);
        }
      }, timePerQuestion); // Use the same time value as Timer component

      return () => clearTimeout(timer);
    }
  }, [activeQuestionIndex, numberOfQuestions, questions, quizFinished]);

  // Add this helper function at the top of the file
const getCategoryId = (categoryName) => {
  const categoryMap = {
    'Computers': '18',
    'History': '23',
    'Sports': '21'
  };
  return categoryMap[categoryName] || '0';
};

  function selectAnswerHandler(answer) {
    if (!canAnswer) return;
    setCanAnswer(false);
    setIsLoading(true);
    
    if (answer.correct) {
        setScore(prevScore => {
            const newScore = prevScore + 1;
            // Only send name and score
            const studentScore = { 
                name: nameStudent, 
                score: newScore
            };
            socket.emit("studentScore", studentScore);
            return newScore;
        });
    } else {
        // Only send name and score
        const studentScore = { 
            name: nameStudent, 
            score: score
        };
        socket.emit("studentScore", studentScore);
    }
  
    // Display correct answer until timer changes question
    const correctAnswer = questions[activeQuestionIndex].correct_answer;
    const answerButtons = document.querySelectorAll(".answer-button");
    answerButtons.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add("btn-success");
      } else {
        button.classList.add("btn-danger");
      }
    });
  
    answerChosen = true;
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  return (
    <div className="container-fluid"> {/* Changed to container-fluid for better responsiveness */}
      <div className="container">
        {/* Timer and Stop button row */}
        <div className="row align-items-center justify-content-between g-3"> {/* Added gap utility */}
          {/* Timer - adjusted columns for different breakpoints */}
          {!quizFinished && (
            <div className="col-12 col-sm-6 text-center text-sm-start">
              <Timer activeQuestionIndex={activeQuestionIndex} />
            </div>
          )}
          
          {/* Stop button - adjusted columns for different breakpoints */}
          {quizFinished === false ? (
            <div className="col-12 col-sm-6 text-center text-sm-end">
              <Link to="/">
                <button
                  className="btn btn-secondary p-2 p-sm-3 px-3 px-sm-4 rounded-3"
                  type="button"
                >
                  Stop
                </button>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Question container */}
        <div
          className="container rounded p-3 p-sm-4 my-2"
          style={{ backgroundColor: "#c0deff" }}
        >
          <div className="row">
            {isLoading ? (
              <Spinner light={true} size={4} />
            ) : questions.length === 0 ? (
              <></>
            ) : (
              <>
                {!quizFinished ? (
                  <div className="container">
                    {/* Question counter */}
                    <div className="row mb-3">
                      <div className="col-12 text-center h3 h2-sm">
                        Question {activeQuestionIndex + 1}/{numberOfQuestions}
                      </div>
                    </div>

                    {/* Question and answers */}
                    <div className="row">
                      {isHost ? (
                        <div className="container">
                          <h3 className="text-center mb-4 fs-4 fs-sm-3">
                            {decode(questions[activeQuestionIndex].question)}
                          </h3>
                          <div className="d-grid gap-2 gap-sm-3">
                            {[
                              ...questions[activeQuestionIndex].incorrect_answers,
                              questions[activeQuestionIndex].correct_answer
                            ].map((answer, index) => (
                              <button
                                key={index}
                                className={`btn py-3 py-sm-4 rounded-3 ${
                                  answer === questions[activeQuestionIndex].correct_answer
                                    ? "btn-success"
                                    : "btn-secondary"
                                }`}
                                disabled
                              >
                                {decode(answer)}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Question
                          question={questions[activeQuestionIndex].question}
                          correct_answer={questions[activeQuestionIndex].correct_answer}
                          incorrect_answers={questions[activeQuestionIndex].incorrect_answers}
                          selectAnswerHandler={selectAnswerHandler}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="container text-center">
                    <Leaderboard />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Correct answer display */}
        {!isHost && answerChosen && (
          <div
            className="container rounded p-3 p-sm-4 my-2"
            style={{ backgroundColor: "#c0deff" }}
          >
            <div className="row">
              <div className="col-12">
                <h2 className="h3 mb-3">Correct answer:</h2>
                <button className="btn btn-secondary w-100 w-sm-75 py-3 py-sm-4 rounded-3">
                  {decode(questions[activeQuestionIndex].correct_answer)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Play;
