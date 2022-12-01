import React from 'react'
import Row from './components/Row'
import { Link } from 'react-router-dom'

function leaderboard() {
  const arr = [{name: 'afd', category: 'afda', score: '2'}];

  let data = [];
  
  for(let i = 0; i < 10; i++){
    if(arr[i] != null){
      data.push(arr[i]);
    }
    else{
      data.push({name:' ', category:' ', score:' '});
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row text-center m-5">
          <div className="col align-items-center"><h1 className='position-absolute start-50'>Top Scores</h1></div>
          <div className="col"><Link to='../selectCategory'><button   type="button" className="btn btn-lg btn-secondary p-3 px-5 position-absolute top-0 end-0 m-5">Replay</button></Link></div>
        </div>
        <div className="row text-center align-items-center">
          <table className='m-5 table table-center'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return <Row name={item.name} category={item.category} score={item.score} key={index}></Row>
              })}
            </tbody>
         </table>
        </div>
      </div>
    </div>
  )
}

export default leaderboard