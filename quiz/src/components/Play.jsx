import React, { useEffect, useState } from "react";
import Question from "./Question";
import Spinner from "../Spinner";
import Result from "../Result";
import { openTDhost } from "../constants";
import { useSearchParams, Link } from "react-router-dom";
import {SocketContext} from "../data/socketContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Play() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);c:\Users\adm1\Downloads\TransactionalWeb2\quiz with munir\finalQuiz\quiz\src\components\Play.jsx
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [query, setQuery] = useSearchParams();

  const numberOfQuestions = 10;

  useEffect(() => {


    const categoryName = localStorage.getItem("CategoryName");
    //const difficulty = localStorage.getItem("Difficulty");
    socket.on("quizInfo", (data) => {
      	console.log(data)
    }



    )    
/*
    if (!selectedCategory || !selectedDifficulty) {
      setSelectedCategory({ id: query.get("categoryId"), name: categoryName });
      setSelectedDifficulty({ id: query.get("difficulty"), name: difficulty });
      return;
    }

    const url = `${openTDhost}?amount=${numberOfQuestions}&category=${selectedCategory.id}&difficulty=hard`;

    setIsLoading(true);

    async function fetchTrivia() {
      const triviaResponse = await fetch(url);

      const body = await triviaResponse.json();

      if (body.results) {
        setQuestions(body.results);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    fetchTrivia();*/


  }, [selectedCategory, query]);

  function selectAnswerHandler(answer) {
    setIsLoading(true);

    if (answer.correct) {
      setScore((value) => value + 1); // increment score
    }

    if (activeQuestionIndex === numberOfQuestions - 1) {
      // last question
      setQuizFinished(true);
    } else {
      // next question
      setActiveQuestionIndex((value) => value + 1);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  return (
    <div>
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
              {!quizFinished ? (
                <div className="container">
                  <div className="row">
                    <div className="col-12 text-center h2">
                      Question {activeQuestionIndex + 1}/{numberOfQuestions}
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
                  {/* Score/result component */}
                  <div className="container text-center">
                    <Result score={score} category={selectedCategory} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Play;
