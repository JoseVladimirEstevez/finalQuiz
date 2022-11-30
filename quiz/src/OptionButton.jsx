import React from 'react'

function OptionButton(props) {
  return (
    <div className="col text-center m-3"><button className='btn text-center  border border-dark border-2 btn-lg rounded-pill py-5 ' style={{width:"200px"}} >{props.name}</button></div>
  )
}

export default OptionButton