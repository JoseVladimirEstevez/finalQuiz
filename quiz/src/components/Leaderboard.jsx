import React, { useState, useEffect } from "react";
import Row from "./Row";
import { Link, ScrollRestoration } from "react-router-dom";
import { token, top10route } from "../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../data/socketContext";

function Leaderboard() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  if (socket) {
    

  } else {
    navigate("/multiplayer");
    console.log("No socket found");
  }

  // const [scores, setScores] = useState([]);

  // useEffect(() => {
  //   //called upon component mount
  //   fetchScores();
  // }, []);

  // async function fetchScores() {
  //   const top10scores = [];

  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: token,
  //     },
  //   };

  //   const response = await fetch(top10route, options);
  //   const data = await response.json();

  //   //setScores(data);

  //   for (let i = 0; i < 10; i++) {
  //     if (data[i]) {
  //       top10scores.push({
  //         name: data[i].name,
  //         categoryName: data[i].categoryName,
  //         score: data[i].score,
  //       });
  //     } else {
  //       top10scores.push({ name: " ", categoryName: " ", score: " " });
  //     }
  //   }
  //   setScores(top10scores);
  //}

  return (
    <div>
      <div className="container">
        <div className="row text-center m-5">
          <div className="col align-items-center">
            <h1 className="position-absolute start-50">Top Scores</h1>
          </div>
          <div className="col">
            <Link to="../selectCategory">
              <button
                type="button"
                className="btn btn-lg btn-secondary p-3 px-5 position-absolute top-0 end-0 m-5 rounded-pill"
              >
                Replay
              </button>
            </Link>
          </div>
        </div>
        <div className="row text-center align-items-center">
          <table className="m-5 table table-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {/* {scores.map((item, index) => {
                return (
                  <Row
                    name={item.name}
                    category={item.categoryName}
                    score={item.score}
                    key={index}
                  ></Row>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
