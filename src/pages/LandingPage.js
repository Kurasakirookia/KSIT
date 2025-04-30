import React from 'react'
import "../css/LandinfPage.css"
import landing_img from "../assets/learn_loop_img1.png"

const LandingPage = () => {
  return (
    <div className='landing_page_container'>
        <div className="landing_writeup">
            <div className="writeup_container">
                <h2 className="heading">Learn Loop</h2> <br />
                <p className="landing_text text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error sint id rerum, maxime laborum iure illo praesentium quo sunt rem minima doloribus. Sit dolores asperiores atque! Numquam, et mollitia. Explicabo, quas nostrum. Vitae, autem veniam!

                </p>
                <div className="loginsignin">
                    <p className="login_button box">GetStarted</p>
                    <p className="signin_button box">SignUp</p>
                </div>
            </div>
        </div>
        <div className="landing_gif">
            <div className="gif_container">
                    <img src={landing_img} alt="landing_image" className='landing_image' />
            </div>
        </div>
      
    </div>
  )
}

export default LandingPage
