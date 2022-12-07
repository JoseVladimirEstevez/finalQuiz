import React from "react";
import { Link } from "react-router-dom";

function OptionButton(props) {


  function changeLocalStorage(name ){

    localStorage.setItem("CategoryName", name);
  }
  
  return (
    <div className="col text-center m-3">
      <Link to={props.linkTo}>
        <button
        onClick={()=> changeLocalStorage(props.name)}
          className="btn text-center  border border-dark border-2 btn-lg rounded-pill py-5 "
          style={{ width: "200px" }}
        >
          {props.name}
        </button>
      </Link>
    </div>
  );
}

export default OptionButton;
