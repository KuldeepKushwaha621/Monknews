import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = ()=> {
 const pageSize = 5;
 const apiKey = "f98e5ee099d749d1803097d252471314"

 const [progress, setProgress] = useState(0)


const setprogress = (progress) =>{
  setProgress(progress)

 }

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}/>

   
        <Routes>
          <Route exact path='/' element = {<News setprogress={setprogress} apiKey = {apiKey} key="general" pageSize={pageSize} country ='in' category = "general" />}
          />   
          <Route exact path='/business' element={ <News setprogress={setprogress} apiKey = {apiKey} key="business" pageSize={pageSize} country ='in' category = "business" />} />  
          <Route exact path='/entertainment' element={<News setprogress={setprogress} apiKey = {apiKey} key="entertainment" pageSize={pageSize} country ='in' category = "entertainment" />} />  
          <Route exact path='/general' element={<News setprogress={setprogress} apiKey = {apiKey} key="general" pageSize={pageSize} country ='in' category = "general" />} />  
          <Route exact path='/health' element={<News setprogress={setprogress} apiKey = {apiKey} key="health" pageSize={pageSize} country ='in' category = "health" /> } />  
          <Route exact path='/science' element={<News setprogress={setprogress} apiKey = {apiKey} key="science" pageSize={pageSize} country ='in' category = "science" />} />  
          <Route exact path='/sports' element= {<News setprogress={setprogress} apiKey = {apiKey} key="sports" pageSize={pageSize} country ='in' category = "sports" />} />
          <Route exact path='/technology' element={<News setprogress={setprogress} apiKey = {apiKey} key="technology" pageSize={pageSize} country ='in' category = "technology" /> } />  
        </Routes>
        </Router>
      </div>
    )
  }

export default App