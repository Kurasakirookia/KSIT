import React from 'react'
import "../css/HomePage.css"
import courses from "../data/CoursesData"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import view_more from "../assets/view_more_icon.png"


const HomePage = () => {
  const navigate=useNavigate();
 

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const maxVisibleCourses = 6;
  const visibleCourses = filteredCourses.slice(0, maxVisibleCourses);

  return (
    <div className='homepage_container'>
      <div className="query_box">
        <h2 className="text">What Are You Looking for?</h2>
        <div className="search_container">
          <input
            className='search'
            type="text"
            placeholder="    Search courses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="courses_container">

        {filteredCourses.length > 0 ? (
          <>
          {visibleCourses.map(course => (
            <div key={course.id} className="course_card" onClick={()=>navigate("/GetStarted",{state:course.title})}>
              <div className="info">
                <h3>{course.title}</h3>
                <p className='des'>{course.description}</p>
              </div>
            </div>
          ))}
          {filteredCourses.length>maxVisibleCourses &&(
            <button className='view_more' onClick={()=>navigate("/Courses")}>
              
              <img src={view_more} alt="view_more_icon" className='view_more_img' />
              view more <br />
            </button>

          )}
        
          </>
          ) : (
          <p className="no_course">Sorry, we don't have that course yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;