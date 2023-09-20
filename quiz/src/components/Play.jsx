import React, { useEffect, useState } from "react";
import Question from "./Question";
import Spinner from "../Spinner";
import Result from "../Result";
import { openTDhost } from "../constants";
import { useSearchParams, Link } from "react-router-dom";
import { SocketContext } from "../data/socketContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";
import Leaderboard from "./Leaderboard";

let answerChosen = false;

function Play() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [query, setQuery] = useSearchParams();
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [nameStudent, setNameStudent] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    const questionsTest = localStorage.getItem("quizInfo");
    
    const questionsJSONParse = JSON.parse(questionsTest);
    setQuestions(questionsJSONParse.results);
    setNumberOfQuestions(questionsJSONParse.results.length);
    setNameStudent(localStorage.getItem("name"));
    setTime(localStorage.getItem("timer"));

    if (socket) {
      socket.on("returnScore", (data) => {
        console.log('data: ', data);
      localStorage.setItem("leaderBoard", JSON.stringify(data));
      })
    } else {
      navigate("/multiplayer");
      console.log("No socket found");
    }
  }, []);

  function selectAnswerHandler(answer) {
    setIsLoading(true);
    console.log("right ans: " + questions[activeQuestionIndex].correct_answer)

    if (answer.correct) {
      setScore((value) => value + 1); // increment score
    }
    const studentScore = { name: nameStudent, score: score };

    socket.emit("studentScore", studentScore);
    if (activeQuestionIndex === numberOfQuestions - 1) {
      // last question
      setQuizFinished(true);
    } else {
      // next question
      answerChosen = true

      setTimeout(() => {
        setActiveQuestionIndex((value) => value + 1);
        answerChosen = false;
      }, time)
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  function storeScores(){

    socket.on("returnScore", (data) => {
      console.log(data)
    })
    navigate("/multiplayer/leaderboard")
  }

  return (
    <div>
      {" "}
      {quizFinished === false ? (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/">
            <button
              className="btn btn-secondary p-3 px-4 rounded-pill m-3"
              type="button"
            >
              Stop
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div
        className="container rounded p-4 my-2"
        style={{ backgroundColor: "#c0deff" }}
      >
        <div className="row">
          {isLoading ? (
            <Spinner light={true} size={4}></Spinner>
          ) : questions.length === 0 ? (
            <></>
          ) : (
            <>
              {" "}
              {!quizFinished ? (
                <div className="container">
                  <div className="row">
                    <div className="col-12 text-center h2">
                      Question {activeQuestionIndex + 1}/{numberOfQuestions}{" "}
                    </div>
                  </div>
                  <div className="row">
                    <Question
                      question={questions[activeQuestionIndex].question}
                      correct_answer={
                        questions[activeQuestionIndex].correct_answer
                      }
                      incorrect_answers={
                        questions[activeQuestionIndex].incorrect_answers
                      }
                      selectAnswerHandler={selectAnswerHandler}
                    ></Question>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  {/* Score/result component */}
                  <div className="container text-center">
                    <Leaderboard />
                  </div>
                </>
              )}{" "}
            </>
          )}{" "}
        </div>
      </div>
      {answerChosen ? (
      <div className="container rounded p-4 my-2"
        style={{ backgroundColor: "#c0deff" }}>
        <div className="row">
          <div className="col-12 h2">
            Correct answer: 
            <button className="btn btn-secondary w-75 m-2 py-4 rounded-pill">
              {/*{questions[activeQuestionIndex].correct_answer}*/}
            </button>
          </div>
        </div>
      </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Play;
