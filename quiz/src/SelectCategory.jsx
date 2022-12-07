import React from "react";

import OptionButton from "./components/OptionButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function selectCategory() {








  return (
    <div>
      <Link to="/">
        {" "}
        <button className="m-3"> &lt; = Back</button>{" "}
      </Link>
      <div className="container-flex">
        <div className="d-flex p-3 text-center  justify-content-center align-items-center ">
          <div className="">
            <h1>New Quiz</h1>
            <h5 className=" py-3 ">Please Select a category.</h5>
          </div>
        </div>

        <div className="row">
          <OptionButton linkTo="../play?version=history" name="History" id="23"></OptionButton>
          <OptionButton linkTo="../play?version=entertainement" name="Entertainement: Video-Games" id="15"></OptionButton>
        </div>
        <div className="row">
          <OptionButton linkTo="../play?version=mythology" name="Mythology" id="20"></OptionButton>
          <OptionButton linkTo="../play?version=mathematics" name="Mathematics" id="19"></OptionButton>
        </div>
      </div>
    </div>  
  );
}

export default selectCategory;
