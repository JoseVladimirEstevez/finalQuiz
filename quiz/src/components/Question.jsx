import React from "react";
import _ from "lodash";
import { decode } from "html-entities";

function Question({
  question,
  correct_answer,
  incorrect_answers,
  selectAnswerHandler,
}) {
  // Decode answers when creating the array
  function answersButtons() {
    const allAnswers = [...incorrect_answers, correct_answer].map((answer) => {
      return { 
        text: decode(answer), // Decode the answer text immediately
        correct: false 
      };
    });
    allAnswers[allAnswers.length - 1].correct = true;

    return _.shuffle(
      allAnswers.map((answer, index) => {
        return (
          <div className="col-6 text-center p-2" key={index}>
            <button
              className="btn btn-secondary py-3 py-sm-4 rounded-3 answer-button w-100"
              onClick={() => selectAnswerHandler(answer)}
            >
              {answer.text} {/* No need to decode here anymore */}
            </button>
          </div>
        );
      })
    );
  }

  // Decode question when rendering
  const decodedQuestion = decode(question);

  return (
    <div className="container">
      <h3 className="p-3 text-center mb-4">{decodedQuestion}</h3>
      <div className="row g-3">
        {answersButtons()}
      </div>
    </div>
  );
}

export default Question;
