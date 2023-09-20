import React, { useEffect, useState } from "react";
import Question from "./Question";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { SocketContext } from "../data/socketContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Leaderboard from "./Leaderboard";
import Timer from "./Timer";

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
  //const [time, setTime] = useState(0);

  useEffect(() => {
    const questionsTest = localStorage.getItem("quizInfo");
    
    const questionsJSONParse = JSON.parse(questionsTest);
    setQuestions(questionsJSONParse.results);
    setNumberOfQuestions(questionsJSONParse.results.length);
    setNameStudent(localStorage.getItem("name"));
    
    if (socket) {
      //startCountdown()

      socket.on("returnScore", (data) => {
        //console.log('data: ', data);
        localStorage.setItem("leaderBoard", JSON.stringify(data));
      })
      //setTime(JSON.parse(localStorage.getItem("time")));
      //setTime(JSON.parse(data.timePerQuestion));
      //console.log('JSON.parse(data.timePerQuestion): ', JSON.parse(data.timePerQuestion));
      // setInterval(() => {
      //   console.log("tik");
      //   setTime((time) => time - 1)
      // }, 1000);

    } else {
      navigate("/multiplayer");
      console.log("No socket found");
    }
  }, []);

  // Function to start the countdown timer
  // const startCountdown = () => {
  //   clearInterval(countdownIntervalRef.current); // Clear any existing interval
  
  //   countdownIntervalRef.current = setInterval(() => {
  //     setTime((prevTime) => {
  //       if (prevTime === 0) {
  //         clearInterval(countdownIntervalRef.current); // Stop the countdown when it reaches 0
  //         // Show the correct answer for 5 seconds before moving to the next question
  //         answerChosen = true;
  //         setTimeout(() => {
  //           setActiveQuestionIndex((value) => value + 1);
  //           answerChosen = false;
  //         }, 5000); // Wait for 5 seconds before moving to the next question
  //       }
  //       return prevTime;
  //     });
  //   }, 1000); // Decrease time by 1 second every second (1000 milliseconds)
  // };


  function selectAnswerHandler(answer) {
    setIsLoading(true);
    answerChosen = true;
    console.log("right ans: " + questions[activeQuestionIndex].correct_answer)

    if (answer.correct) {
      setScore((value) => value + 1); // increment score
    }
    const studentScore = { name: nameStudent, score: score };

    socket.emit("studentScore", studentScore);

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
      <div className="container">
        <div className="row ">
          <Timer/>
          {quizFinished === false ? (
            <div className="col d-grid gap-2 d-md-flex justify-content-md-end">
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
        </div>
      </div>
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
              {questions[activeQuestionIndex].correct_answer}
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
