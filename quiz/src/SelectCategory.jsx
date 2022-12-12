import React from "react";
import OptionButton from "./components/OptionButton";
import { Link } from "react-router-dom";

function selectCategory() {
  return (
    <div>
      <Link to="/">
        <button
          className="btn btn-secondary m-3 rounded-pill p-3 px-4 text-center"
          type="button"
        >
          &lt; = Back
        </button>
      </Link>
      <div className="container-flex">
        <div className="d-flex p-3 text-center  justify-content-center align-items-center ">
          <div className="">
            <h1>New Quiz</h1>
            <h5 className=" py-3 ">Please Select a category.</h5>
          </div>
        </div>

        <div className="row">
          <OptionButton
            linkTo="../play?categoryId=23"
            name="History"
          ></OptionButton>
          <OptionButton
            linkTo="../play?categoryId=15"
            name="Entertainement: Video-Games"
          ></OptionButton>
        </div>
        <div className="row">
          <OptionButton
            linkTo="../play?categoryId=20"
            name="Mythology"
          ></OptionButton>
          <OptionButton
            linkTo="../play?categoryId=19"
            name="Mathematics"
          ></OptionButton>
        </div>
      </div>
    </div>
  );
}

export default selectCategory;
