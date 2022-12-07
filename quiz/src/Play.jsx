import React from "react";
import OptionButton from "./components/OptionButton";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";


function Play() {

  const questionNumber =1; 
  const categoryName = "History";
  const [query, setQuery] = useSearchParams();
  
  useEffect(()=> {

    localStorage.getItem("Category");
  const version = query.get("version");
  },[])
  
  


  return (
    <div>
      <div className="container-flex">
        <div className="row m-4">
          <div className="col">Q {questionNumber}/10</div>
          <div className="col"><Link style={{ color: "inherit", textDecoration: "none" }} className="d-flex justify-content-end " to="/">
              <button > STOP</button>
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

export default Play;
