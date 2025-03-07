import React, { useState, useEffect } from "react";
import Row from "./Row";
import { Link, ScrollRestoration } from "react-router-dom";
import { token, top10route } from "../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../data/socketContext";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
        socket.emit("getLeaderboard");
        
        socket.on("returnScore", (data) => {
            localStorage.setItem("leaderBoard", JSON.stringify(data));
            const newScoresArray = Object.entries(data)
                .map(([name, userData]) => ({
                    name,
                    categoryName: getCategoryName(userData.category), // Add helper function
                    score: userData.score
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
            
            setScores(newScoresArray);
        });

        return () => {
            socket.off("returnScore");
        };
    }
}, [socket]);

// Add helper function to convert category IDs to names
const getCategoryName = (categoryId) => {
    const categories = {
        "18": "Computers",
        "23": "History",
        "21": "Sports"
        // Add more categories as needed
    };
    return categories[categoryId] || "Quiz";
};

  return (
    <div className="container-fluid">
      {/* Header section */}
      <div className="row align-items-center py-4">
        <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h1 className="display-5">Top Scores</h1>
        </div>
        <div className="col-12 col-md-6 text-center text-md-end">
          <Link to="/">
            <button
              type="button"
              className="btn btn-secondary px-4 py-2 rounded-pill"
            >
              Main menu
            </button>
          </Link>
        </div>
      </div>

      {/* Table section */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="table-responsive rounded">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "40%" }}>Name</th>
                  <th className="text-center" style={{ width: "30%" }}>Category</th>
                  <th className="text-center" style={{ width: "30%" }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'table-warning' : ''}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.categoryName}</td>
                    <td className="text-center fw-bold">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
