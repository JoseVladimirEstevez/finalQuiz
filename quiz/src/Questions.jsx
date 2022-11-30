import React from 'react'
import OptionButton from './OptionButton'
import {Link} from 'react-router-dom'

function Questions(props) {
  return (
  
  <div>
    <div className=" " >Q 1/10
      <div style={{minWidt:"100px"}}>
        <Link className="d-flex justify-content-end " to="/">  <button> STOP</button> </Link> 
      </div>
    </div>
    <div className='container-flex'>
      <div  className="d-flex p-3 text-center  justify-content-center align-items-center ">
        <div className="">
          <h1>
              {props.category=""}   Quiz
          </h1>
          <h5  class=" py-3 ">
              {props.question=""}
          </h5>
        </div>
      </div>

      <div className="row">
        <OptionButton name = {props.correctAnswer}></OptionButton>
        <OptionButton name = {props.incorrectAnswer[0]}></OptionButton>
      </div>
      <div className="row">
        <OptionButton name = {props.incorrectAnswer[1]}></OptionButton>
        <OptionButton name = {props.incorrectAnswer[2]}></OptionButton>
      </div>
    </div>
  </div>
)}
export default Questions
