  // import React,{useState} from 'react';
  // import { useLocation, useNavigate } from 'react-router-dom';
  // import "../css/RoadMap.css";   
  
  // import { getAuth } from 'firebase/auth';
  // import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
  // import reactlogo from "../assets/react_4.png"
  // import roadmapImages from '../data/roadmapImages';

  // // Import all roadmap JSONs
  // import DataStructuresinJava from '../data/dsaJavaRoadmap.json';
  // import ReactforBeginners from '../data/reactForBeginnersRoadmap.json';
  // // Add more imports here...

  // // Store them in an object with normalized keys
  // const roadmaps = {
  //   datastructuresinjava: DataStructuresinJava,
  //   reactforbeginners: ReactforBeginners,
  //   // Add more mappings here
  // };

  // const RoadMap = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const { answers, selectedCourse } = location.state || {};

  //   const [showEnrollForm, setShowEnrollForm] = useState(false);
  //   const [completionDate, setCompletionDate] = useState('');
  //   const [notificationEnabled, setNotificationEnabled] = useState(false);
  
  //   const auth = getAuth();
  //   const db = getFirestore();
    

  //   const normalize = str => str?.toString().toLowerCase().replace(/\s+/g, '');

  //   const normalizeKeys = obj =>
  //     Object.fromEntries(
  //       Object.entries(obj || {}).map(([key, value]) => [normalize(key), normalize(value)])
  //     );

  //   const normalizedAnswers = normalizeKeys(answers);
  //   const normalizedCourseKey = normalize(selectedCourse);
  //   const roadmapData = roadmaps[normalizedCourseKey];
  //   const imageList = roadmapImages[normalizedCourseKey] || [];


  //   // Early exit if course isn't found
  //   if (!roadmapData) {
  //     return (
  //       <div>
  //         <h2>{selectedCourse}</h2>
  //         <p>No roadmap data found for this course. Please check if it’s imported properly.</p>
  //       </div>
  //     );
  //   }

  //   const matchedRoadmap = roadmapData.find(item => {
  //     if (!item.answers) return false; // Skip if no answers defined
  //     const normalizedItemAnswers = normalizeKeys(item.answers);
  //     return Object.entries(normalizedItemAnswers).every(
  //       ([key, value]) => normalizedAnswers[key] === value
  //     );
  //   });

  //   const handleEnroll = () => {
  //     if (!auth.currentUser) {
  //       navigate('/Login'); // If not logged in, send to Login page
  //     } else {
  //       setShowEnrollForm(true); // Show form to enter deadline & notification preference
  //     }
  //   };
  
  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  
  //     try {
  //       const userRef = doc(db, 'users', auth.currentUser.uid);
  
  //       await updateDoc(userRef, {
  //         enrolledCourses: arrayUnion({
  //           course: selectedCourse,
  //           deadline: completionDate,
  //           notificationsEnabled: notificationEnabled,
  //         })
  //       });
  
  //       alert('Successfully Enrolled!');
  //       setShowEnrollForm(false); // Close the form
  //     } catch (error) {
  //       console.error('Error enrolling:', error);
  //       alert('Failed to enroll. Please try again.');
  //     }
  //   };
  

  //   return (
  //     <div className="roadmap_container">
  //       <div className='roadmap_info'>
  //         <h2 className='roadmap_course'>Suggested Roadmap for {selectedCourse}</h2>
  
  //         {matchedRoadmap ? (
  //           <ul className='roadmap_steps'>
  //             {matchedRoadmap.roadmap.map((step, idx) => (
  //               <li key={idx} className='li_content'>
  //                 <div className="li_info">
  //                   <h2>{`Step ${idx + 1}`}</h2>
  //                   <p className="step_content">{step}</p>
  //                 </div>
  //                 <div className="roadmap_img_container">
  //                   <img
  //                     src={imageList[idx % imageList.length] || reactlogo}
  //                     alt={`Step ${idx + 1}`}
  //                     className='roadmap_img'
  //                   />
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         ) : (
  //           <p>No matching roadmap found for the selected options.</p>
  //         )}
  
  //         {/* ENROLL Button */}
  //         <button className="enroll_button" onClick={handleEnroll}>
  //           Enroll Now
  //         </button>
  
  //         {/* ENROLL Form (only show when form is opened) */}
  //         {showEnrollForm && (
  //           <form onSubmit={handleFormSubmit} className="enroll_form">
  //             <label>
  //               Completion Date:
  //               <input
  //                 type="date"
  //                 value={completionDate}
  //                 onChange={(e) => setCompletionDate(e.target.value)}
  //                 required
  //               />
  //             </label>
  //             <label>
  //               Daily Notifications:
  //               <input
  //                 type="checkbox"
  //                 checked={notificationEnabled}
  //                 onChange={(e) => setNotificationEnabled(e.target.checked)}
  //               />
  //             </label>
  //             <button type="submit" className="submit_enroll_button">
  //               Submit Enrollment
  //             </button>
  //           </form>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };
  

  // export default RoadMap;
  import React from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { getAuth } from 'firebase/auth';
  import "../css/RoadMap.css";   
  
  import reactlogo from "../assets/react_4.png";
  import roadmapImages from '../data/roadmapImages';
  
  // Import all roadmap JSONs
  import DataStructuresinJava from '../data/dsaJavaRoadmap.json';
  import ReactforBeginners from '../data/reactForBeginnersRoadmap.json';
  // Add more imports...
  
  const roadmaps = {
    datastructuresinjava: DataStructuresinJava,
    reactforbeginners: ReactforBeginners,
    // More...
  };
  
  const RoadMap = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { answers, selectedCourse } = location.state || {};
  
    const auth = getAuth();
  
    const normalize = str => str?.toString().toLowerCase().replace(/\s+/g, '');
    const normalizeKeys = obj =>
      Object.fromEntries(
        Object.entries(obj || {}).map(([key, value]) => [normalize(key), normalize(value)])
      );
  
    const normalizedAnswers = normalizeKeys(answers);
    const normalizedCourseKey = normalize(selectedCourse);
    const roadmapData = roadmaps[normalizedCourseKey];
    const imageList = roadmapImages[normalizedCourseKey] || [];
  
    if (!roadmapData) {
      return (
        <div>
          <h2>{selectedCourse}</h2>
          <p>No roadmap data found for this course.</p>
        </div>
      );
    }
  
    const matchedRoadmap = roadmapData.find(item => {
      if (!item.answers) return false;
      const normalizedItemAnswers = normalizeKeys(item.answers);
      return Object.entries(normalizedItemAnswers).every(
        ([key, value]) => normalizedAnswers[key] === value
      );
    });
  
    const handleEnroll = () => {
      if (!auth.currentUser) {
        navigate('/Login'); // not logged in
      } else {
        navigate('/Enroll', { state: { selectedCourse } }); // go to enroll page
      }
    };
  
    return (
      <div className="roadmap_container">
        <div className="roadmap_info">
          <h2 className="roadmap_course">Suggested Roadmap for {selectedCourse}</h2>
  
          {matchedRoadmap ? (
            <ul className="roadmap_steps">
              {matchedRoadmap.roadmap.map((step, idx) => (
                <li key={idx} className="li_content">
                  <div className="li_info">
                    <h2>{`Step ${idx + 1}`}</h2>
                    <p className="step_content">{step}</p>
                  </div>
                  <div className="roadmap_img_container">
                    <img
                      src={imageList[idx % imageList.length] || reactlogo}
                      alt={`Step ${idx + 1}`}
                      className="roadmap_img"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching roadmap found.</p>
          )}
  
          {/* Only Button Now */}
          <button className="enroll_button" onClick={handleEnroll}>
            Enroll Now
          </button>
        </div>
      </div>
    );
  };
  
  export default RoadMap;
  