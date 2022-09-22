import React from 'react'
import { Routes, Route} from "react-router-dom";

import Home from './components/pages/Home';
import EditComponant from './components/student/EditComponent';
import View from './components/student/View';
// import StepperEdit from './components/student/StepperEdit';


const App = () => {
  return (
  <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/view/:id' element={<View/>} />
          <Route path='/edit/:id' element={<EditComponant/>} />
          {/* <Route path='/edit/:id' element={<StepperEdit/>} /> */}
      </Routes>
  </> 
  )
}

export default App