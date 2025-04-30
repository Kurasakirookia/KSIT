import React from 'react'
import "../css/LandinfPage.css"
import landing_img from "../assets/learn_loop_img1.png"
import bg1 from "../assets/illustration_no_border_0.png"
import bg2 from "../assets/illustration_no_border_1.png"
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="landing_page_bg">
        
    <div className='landing_page_container'>
        <img src={bg1} alt="bg1" className='cornerimg left' />
        <img src={bg2} alt="bg2" className='cornerimg right' />
        <div className="landing_writeup">
            <div className="writeup_container">
                <h2 className="heading">Learn Loop</h2> 
                <p className="landing_text text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error sint id rerum, maxime laborum iure illo praesentium quo sunt rem minima doloribus. Sit dolores asperiores atque! Numquam, et mollitia. Explicabo, quas nostrum. Vitae, autem veniam!

                </p>
                <div className="loginsignin">
                    <Link to="/Login" className="login_button box text">GetStarted</Link>
                    <Link to="/Signup" className="signin_button box text">SignUp</Link>
                </div>
            </div>
        </div>
        <div className="landing_gif">
            <div className="gif_container">
                    <img src={landing_img} alt="landing_image" className='landing_image' />
            </div>
        </div>
      
    </div>
    </div>
  )
}

export default LandingPage
