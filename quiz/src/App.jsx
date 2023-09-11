import { Link } from "react-router-dom";
function App() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center  justify-content-center align-items-center "
    >
      <div>
        <h1>Welcome to Quiz Application!</h1>
        <h5 className=" py-5 ">Made by Vladimir and Munir.</h5>
        <div>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to="/multiplayer/choice"
          >
            {" "}
            <button
              type="button"
              className="px-5 p-3 btn btn-lg btn-secondary rounded-pill"
            >
              Play{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default App;
