import React from 'react'
import "../css/Courses.css"
import courses from "../data/CoursesData"
import { useState } from 'react'
import search_icon from "../assets/search_icon.svg"
import search_img from "../assets/search.png"

import bg from "../assets/background_asset.png"

const Courses = () => {
  
 

    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
    return (
      // <div className='cour_container'>
      //   <div className="course_page_query_box">
      //     <h4 className="text">Start learning your fav course today</h4>
      //     <div className="course_page_search_container">
      //       <input
      //         className='search'
      //         type="text"
      //         placeholder="    Search courses"
      //         value={searchTerm}
      //         onChange={(e) => setSearchTerm(e.target.value)}
      //       />
      //     </div>
      //   </div>
  
      //   <div className="course_page_courses_container">
  
      //     {filteredCourses.length > 0 ? (
            
      //       filteredCourses.map(course => (
      //         <div key={course.id} className="course_page_card">
      //           <div className="coursecard">
      //               <div className="course_info">
      //                   <h3>{course.title}</h3>
      //                   <p className='des'>{course.description}</p>
      //               </div>
      //           </div>
      //         </div>
      //       ))
            
          
            
      //       ) : (
      //       <p className="no_course">Sorry, we don't have that course yet.</p>
      //     )}
      //   </div>
      // </div>
      <div className="course_container">
        <img src={bg} alt="" className='course_bg' />
        <div className="course_page_search_container">
          <img src={search_img} alt="" id='search_img'/>
         <div className="search_bar">
            <input
                className='search'
                type="text"
                placeholder="search courses"
                value={searchTerm}
                style={{paddingLeft:'36px'}}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            <img src={search_icon} alt=""  id='search_icon'/>
          </div>
        </div>



        <div className="course_page_courses_container">
            {filteredCourses.length > 0 ? (
              
              filteredCourses.map(course => (
                <div key={course.id} className="course_page_card" style={course.style}>
                  <div className="coursecard">
                      <div className="course_info">
                          <h3>{course.title}</h3>
                          <p className='des'>{course.description}</p>
                      </div>
                      <img src={course.img} alt={`${course.title} img`} id='course_img'/>
                  </div>
                </div>
              ))
              
            
              
              ) : (
              <p className="no_course" style={{color:'#FCF9C3', fontFamily:'hb',fontSize:'36px'}}>Sorry, we don't have that course yet.</p>
            )}
        </div>
      

    </div>
    );
}

export default Courses

