import React from 'react'
import "../css/Courses.css"
import courses from "../data/CoursesData"
import { useState } from 'react'


const Courses = () => {
  
 

    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
    return (
      <div className='cour_container'>
        <div className="course_page_query_box">
          <h4 className="text">Start learning your fav course today</h4>
          <div className="course_page_search_container">
            <input
              className='search'
              type="text"
              placeholder="    Search courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
  
        <div className="course_page_courses_container">
  
          {filteredCourses.length > 0 ? (
            
            filteredCourses.map(course => (
              <div key={course.id} className="course_page_card">
                <div className="coursecard">
                    <div className="course_info">
                        <h3>{course.title}</h3>
                        <p className='des'>{course.description}</p>
                    </div>
                </div>
              </div>
            ))
            
          
            
            ) : (
            <p className="no_course">Sorry, we don't have that course yet.</p>
          )}
        </div>
      </div>
    );
}

export default Courses

