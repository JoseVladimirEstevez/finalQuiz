import React from 'react'
import Row from './components/Row'

function leaderboard() {
  const arr = {name: 'afd', category: 'afda', score: '2'};

  return (
    <div>
      <div className="container">
        <div className="row text-center m-5">
          <div className="col align-items-center"><h1>Top Scores</h1></div>
          <div className="col"><button   type="button" className="btn btn-lg btn-secondary align-items-end">Replay</button></div>
        </div>
        <div className="row text-center align-items-center">
          <table>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Score</th>
            </tr>
            <Row name={arr.name} category={arr.category} score={arr.score}></Row>
         </table>
        </div>
      </div>
    </div>
  )
}

export default leaderboard