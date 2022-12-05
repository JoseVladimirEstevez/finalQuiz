import React from "react";
import OptionButton from "./components/OptionButton";
import { Link } from "react-router-dom";


function play() {

  const questionNumber =1; 
  const categoryName = "History";
  
  return (
    <div>
      <div className="container-flex">
        <div className="row m-4">
          <div className="col">Q {questionNumber}/10</div>
          <div className="col"><Link className="d-flex justify-content-end " to="/">
              <button> STOP</button>
            </Link></div>
        </div>
      </div>
      <div className="container-flex">
        <div className="d-flex p-3 text-center  justify-content-center align-items-center ">
          <div className="">
            <h1>{categoryName} Quiz</h1>
            <h5 className=" py-3 ">"Questions"</h5>
          </div>
        </div>

        <div className="row">
          <OptionButton linkTo="../result" name="AnswerExample"></OptionButton>
          <OptionButton linkTo="../result" name="AnswerExample"></OptionButton>
        </div>
        <div className="row">
          <OptionButton linkTo="../result" name="AnswerExample"></OptionButton>
          <OptionButton linkTo="../result" name="AnswerExample"></OptionButton>
        </div>
      </div>
    </div>
  );
}

export default play;
