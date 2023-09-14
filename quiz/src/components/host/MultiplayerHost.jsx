import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../data/socketContext";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

function MultiplayerHost() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({category: "", timePerQuestion: "", numberOfQuestions: "", difficulty: "easy"});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        //console.log(formData);
    };

    const handleSubmit = (e) => {
       //e.preventDefault();
        // Send formData to server or perform any necessary action
        socket.emit("quizInfo", formData)
        console.log(formData);
        navigate("/multiplayer/queue")
    };

    useEffect(() => {
        if (socket) {
            socket.emit("reach10", {count: 30});
        } else {
            navigate("/multiplayer");
            console.log("No socket found");
        }
    }, []);

    return (
        <div style={
                {minHeight: "100vh"}
            }
            className="d-flex flex-column p-5 text-center justify-content-center align-items-center">
            <h1>Host a Room</h1>
            <form>
                <div className="m-2">
                    <label className="m-3 ">
                        Category:
                        <select className="mx-3" name="category"
                            value={
                                formData.category
                            }
                            onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="18">Science: Computers</option>
                            <option value="23">History</option>
                            <option value="21">Sports</option>
                        </select>
                    </label>
                </div>
                <div className="m-2">
                    <label className="m-3">
                        Time per Question (seconds):
                        <input className="mx-3" type="number" name="timePerQuestion"
                            value={
                                formData.timePerQuestion
                            }
                            onChange={handleChange}
                            min="1"/>
                    </label>
                </div>
                <div className="m-2">
                    <label className="m-3">
                        Number of Questions:
                        <input className="mx-3" type="number" name="numberOfQuestions"
                            value={
                                formData.numberOfQuestions
                            }
                            onChange={handleChange}
                            min="1"/>
                    </label>
                </div>
                <div className="m-2">
                    <label className="m-3">Difficulty:</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input " type="radio" name="difficulty" value="easy"
                            checked={
                                formData.difficulty === "easy"
                            }
                            onChange={handleChange}/>
                        <label className="form-check-label">Easy</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="difficulty" value="medium"
                            checked={
                                formData.difficulty === "medium"
                            }
                            onChange={handleChange}/>
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="difficulty" value="hard"
                            checked={
                                formData.difficulty === "hard"
                            }
                            onChange={handleChange}/>
                        <label className="form-check-label">Hard</label>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="m-2">
                        <div style={
                                {
                                    color: "inherit",
                                    textDecoration: "none"
                                }
                            }
                            to={
                                `/multiplayer/queue`
                        }>
                            <button type="submit" className="px-2 py-1 btn btn-lg btn-secondary rounded-pill" onClick={() => handleSubmit()}>
                                Create Room
                            </button>
                        </div>
                    </div>
                    <div className="m-2">
                        <Link style={
                                {
                                    color: "inherit",
                                    textDecoration: "none"
                                }
                            }
                            to="/multiplayer/choice">
                            <button type="button" className="px-2 py-1 btn btn-lg btn-secondary rounded-pill">
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MultiplayerHost;
