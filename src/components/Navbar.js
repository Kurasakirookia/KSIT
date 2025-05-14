import React from 'react'
import "../css/Navbar.css";
import { Link } from 'react-router-dom';
import profile from "../assets/profile_logo.png"

// import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar_container'>
        <ul className="nav_content">
           <Link  className='nav_item' to='/'><li className="item item1">Home</li> </Link> 
            <Link  className='nav_item' to='/Courses'> <li className="item item2">Courses</li></Link>
             <Link className='nav_item'  to='/ProfilePage'><li className="item item3">Progress</li></Link>
             <Link  className='nav_item' to='/Issue'><li className="item item4">Tests</li></Link>
        </ul>

        <div className="login_signup">
         <Link to="/ProfilePage" className='profilelogo_content'><p className="text"> <img src={profile} alt="profile" className='profilelogo'/> Profile </p>  </Link> 
          <Link to="/Login"> 
            <p className='loginbutton'>Login/Signup
              </p>
          </Link>
        </div>
      
    </div>
  )
}

export default Navbar
