import {Link} from 'react-router-dom'
function App() {
  return (
    <div style={{minHeight:"100vh"}} className="d-flex p-5 text-center bg-light  justify-content-center align-items-center ">
      <div className="">
        <h1>
          Welcome to Quiz Application!
        </h1>
        <h5  class=" py-5 ">Made by Vladimir and Munir.       
        </h5>
        <div> 
        <button   type="button" class="px-5 py-3 btn btn-lg btn-secondary"> <Link style={{color:"inherit",textDecoration:"none"}} to="/play">Play</Link> </button>
        </div>
      </div>
    </div>
  );
}
export default App;