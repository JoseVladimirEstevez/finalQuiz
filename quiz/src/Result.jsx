import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { scores, token } from "./constants";


function Result() {

  const random = Math.round(Math.random * 10);
  const [name, setName] = useState("");
  console.log('name: ', name);

  async function SaveName(){
    const options = {
      method:"POST",
      headers: {
        "Authorization": token
      },
      body: { "score": random,
      "name": "MUNIR",
      "categoryId": 24,
      "categoryName": "Theory" }
    }

    const response = await fetch(scores, options)
    console.log('response.status: ', response.status);
  }

  useEffect(() =>{
SaveName()
  },[])


  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center  justify-content-center align-items-center "
    >
      <div>
        <h1 className="p-4">Completed!</h1>
        <h3 className="m-4 pb-5">Your score is X / 10</h3>
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
              <Link to="../leaderboard">
                <button type="button" className="btn btn-lg btn-secondary" onClick={()=> SaveName} >
                  Save score to Leaderboard 
                </button>
              </Link>
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
