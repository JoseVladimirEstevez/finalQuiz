import React from 'react'
import OptionButton from './OptionButton'
import {Link} from 'react-router-dom'

function Options() {
  return (
  
  <div>
   <Link to="/">  <button className="m-3"> &lt; =  Back</button> </Link> 
  
  
  <div className='container-flex'>

  <div  className="d-flex p-3 text-center  justify-content-center align-items-center ">
      <div className="">
        <h1>
        New Quiz
        </h1>
        <h5  className=" py-3 ">Please Select a category.       
        </h5>
        
      </div>
    </div>

  <div className="row">
    <OptionButton name = "History"></OptionButton>
    <OptionButton name = "Entertainement"></OptionButton>
  </div>
  <div className="row">
  <OptionButton name = "Mythology"></OptionButton>
  <OptionButton name = "Mathematics"></OptionButton>
      
  </div>
  
</div>
</div>
  )
}

export default Options