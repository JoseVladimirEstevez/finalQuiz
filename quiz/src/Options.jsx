import React from 'react'
import CategoryType from './CategoryType'
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
        <h5  class=" py-3 ">Please Select a category.       
        </h5>
        
      </div>
    </div>

  <div className="row">
    <CategoryType name = "History"></CategoryType>
    <CategoryType name = "Entertainement"></CategoryType>
  </div>
  <div className="row">
  <CategoryType name = "Mythology"></CategoryType>
  <CategoryType name = "Mathematics"></CategoryType>
      
  </div>
  
</div>
</div>
  )
}

export default Options