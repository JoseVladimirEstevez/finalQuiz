import React from 'react'

import OptionButton from './components/OptionButton'
import {Link} from 'react-router-dom'

function selectCategory() {
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
   <OptionButton linkTo = "../play"   name = "History"></OptionButton>
   <OptionButton linkTo = "../play" name = "Entertainement"></OptionButton>
 </div>
 <div className="row">
 <OptionButton linkTo = "../play"  name = "Mythology"></OptionButton>
 <OptionButton  linkTo = "../play" name = "Mathematics"></OptionButton>
     
 </div>
 
</div>
</div>
 )
  
}

export default selectCategory