import { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate  } from 'react-router-dom';
import React from 'react';
import PropertiesView from './components/PropertiesView';
import LscsView from './components/LscsView';
import NotFoundView from './components/NotFoundView';
import logo from './logo.svg';
import './App.css';

function App() {

  // componentDidMount is replaced with 
  // useEffect in Function based component
   const navigate = useNavigate();
  useEffect(() => { 
   
    navigate("/");  
	
    var navElm = document.getElementById('navigation');
    var posTop = navElm.getBoundingClientRect().top;
    window.onscroll = function () {
      if(document.body.scrollTop + document.documentElement.scrollTop > posTop) {
        navElm.className = "fixed";
      } else {
        navElm.className = ""; 
      }
    };
  }, []);

  return (
    <div className="App">
        <div className="App-header">
            <h2>LiveSite Content Services API</h2>
        </div>
        <nav id="navigation">
          <ul className="nav nav-pills">
            <li><NavLink exact="true" className={({ isActive, isPending }) => isActive ? "active" : ""} to='/'>Properties</NavLink></li>
            <li><NavLink className={({ isActive, isPending }) => isActive ? "active" : ""} to='/lscs'>LSCS</NavLink></li>
          </ul>
        </nav>
        <Routes>
            <Route exact path="/" element={<PropertiesView/>} className={({ isActive, isPending }) => isActive ? "active" : ""} />
			<Route path="/lscs" element={<LscsView/>} />
            <Route path="*" element={<NotFoundView/>} />
        </Routes>
      </div>
  );
}

export default App;
