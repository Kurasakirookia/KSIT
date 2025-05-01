import React from 'react'
import "../css/LandinfPage.css"
import landing_img from "../assets/learn_loop_img1.png"
import bg1 from "../assets/illustration_no_border_0.png"
import bg2 from "../assets/illustration_no_border_1.png"
import { Link } from 'react-router-dom'
import courses from '../data/CoursesData'
import arrow from "../assets/arrow.png"

// import card from "../assets/card.svg"
import card from "../assets/Group 1 (2).svg"
const LandingPage = () => {
  return (
    <div className="landing_page_bg">
        
        
    <div className='landing_page_container'>
    <img src={bg1} alt="bg1" className='cornerimg left' />
    <img src={bg2} alt="bg2" className='cornerimg right' />
        
        <div className="landing_writeup">
            <div className="writeup_container">
                <h2 className="heading">Learn <p className='heading_1'>Loop</p></h2> 
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
    {/* options page ------------------ */}
    <div className="landing_container_2">
        <div className="border_n_container">
            <div className="top_writeup">
                <h4 id='our_courses' className='text' >Our courses</h4>
                <p className='text'>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. consectetur adipisicing elit. Optio, eum!</p>
                
            </div>
           
            <div className="cards_container">
                    {courses.slice(0, 3).map(course => (
                        <div className="course_card" key={course.id} style={{backgroundImage: `url(${card})`}}>
                            <div className="card_0">
                                <div className="title_n_arrow">
                                    <h3 className="text title">{course.title}</h3>

                                    <Link to="/Courses" id='arrow_link'>
                                        <div className="arrow_container">
                                            <img src={arrow} alt="a" className='arrow_img'/>
                                        </div>
                                    </Link>
                                </div>
                                
                                <p className="text desciption">{course.description}</p>
                                <img src={course.img} alt={`${course.title} img`} id='course_img'/>
                                
                            </div>
                        </div>
                    ))}
             </div>

            
            <div className='bold_writeup_container'>
                <p className="bold_writeup fancy_text">Start your <p id='fav' className='fancy_text'> favorite </p>  course <p id='fav' className='fancy_text'>personalized</p>,</p>
                <p className="fancy_text"> one loop at a time !  </p>
            </div>
            <div className="bottom_writeup">
                <Link to="/Courses" className='box'>View more</Link>
            </div>

        </div>

    </div>
    </div>
  )
}

export default LandingPage
