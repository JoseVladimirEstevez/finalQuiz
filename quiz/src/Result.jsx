import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scores, token } from "./constants";

import { useSearchParams } from 'react-router-dom';



function Result(props) {
  const [query, setQuery] = useSearchParams();
  const CategoryId = parseInt(query.get("categoryId"),10);
  const categoryName =  localStorage.getItem("CategoryName");

  console.log('CategoryName: ', categoryName);
  console.log('CategoryId: ', CategoryId);
  const score2 = props.score;
  const [name, setName] = useState("");


  const navigate =  useNavigate();
  const data = {
    "score": score2,
    "name": name,
    "categoryId": CategoryId,
    "categoryName": categoryName
  }

  async function SaveName(){
    const options = {
      method:"POST",
      headers: {
        "Authorization": token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(scores, options)
    console.log('response: ', response);
    
    navigate("../leaderboard")
  }



  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center  justify-content-center align-items-center "
    >
      <div>
        <h1 className="p-4">Completed!</h1>
        <h3 className="m-4 pb-5">Your score is {props.score} / 10</h3>
        <div className="container">
          <div className="row align-items-center">
            <div className="col justify-content-end d-flex">
              <h3>Name</h3>
            </div>
            <div className="col">
              <input onChange={event => setName(event.target.value)}
 type="text" id="Username"/>
            </div>
            <div  className="col">
              
                <button type="button" className="btn btn-lg btn-secondary" onClick={()=> SaveName()} >
                  Save score to Leaderboard 
                </button>
              
            </div>
          </div>
        </div>
        <Link to="../selectCategory">
          <button
            type="button"
            className="px-5 py-3 mt-5 btn btn-lg btn-secondary"
          >
            Replay
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
