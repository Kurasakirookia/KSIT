import React from 'react'
import "../css/Navbar.css";
// import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar_container'>
        <ul className="nav_content">
            <li className="item item1">Home</li> 
            <li className="item item2">Courses</li>
            <li className="item item3">Progress</li>
            <li className="item item4">Tests</li>
        </ul>
      
    </div>
  )
}

export default Navbar
