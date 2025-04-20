  import React from 'react';
  import { useLocation } from 'react-router-dom';
  import "../css/RoadMap.css";                         
  import reactlogo from "../assets/react_4.png"
  import roadmapImages from '../data/roadmapImages';

  // Import all roadmap JSONs
  import DataStructuresinJava from '../data/dsaJavaRoadmap.json';
  import ReactforBeginners from '../data/reactForBeginnersRoadmap.json';
  // Add more imports here...

  // Store them in an object with normalized keys
  const roadmaps = {
    datastructuresinjava: DataStructuresinJava,
    reactforbeginners: ReactforBeginners,
    // Add more mappings here
  };

  const RoadMap = () => {
    const location = useLocation();
    const { answers, selectedCourse } = location.state || {};

    const normalize = str => str?.toString().toLowerCase().replace(/\s+/g, '');

    const normalizeKeys = obj =>
      Object.fromEntries(
        Object.entries(obj || {}).map(([key, value]) => [normalize(key), normalize(value)])
      );

    const normalizedAnswers = normalizeKeys(answers);
    const normalizedCourseKey = normalize(selectedCourse);
    const roadmapData = roadmaps[normalizedCourseKey];
    const imageList = roadmapImages[normalizedCourseKey] || [];


    // Early exit if course isn't found
    if (!roadmapData) {
      return (
        <div>
          <h2>{selectedCourse}</h2>
          <p>No roadmap data found for this course. Please check if it’s imported properly.</p>
        </div>
      );
    }

    const matchedRoadmap = roadmapData.find(item => {
      if (!item.answers) return false; // Skip if no answers defined
      const normalizedItemAnswers = normalizeKeys(item.answers);
      return Object.entries(normalizedItemAnswers).every(
        ([key, value]) => normalizedAnswers[key] === value
      );
    });

    return (
      <div className="roadmap_container">
        <div className='roadmap_info'>
          <h2 className='roadmap_course'>Suggested Roadmap for {selectedCourse}</h2>
          {matchedRoadmap ? (
            <ul className='roadmap_steps'>
              {matchedRoadmap.roadmap.map((step, idx) => (
                
                <li key={idx} className='li_content'>
                  <div className="li_info">
                    <h2>{`step ${idx+1}`}</h2>
                    <p className="step_content"> {step}</p>
                  </div>
                  <div className="roadmap_img_container">
                    <img src={imageList[idx % imageList.length] || reactlogo}
                          alt={`Step ${idx + 1}`} 
                          className='roadmap_img' />
                  </div>
                
                </li> 
              ))}
            </ul>
          ) : (
            <p>No matching roadmap found for the selected options.</p>
          )}
        </div>
      </div>
    );
  };

  export default RoadMap;
