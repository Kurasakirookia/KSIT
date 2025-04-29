import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';
import "../css/Enroll.css"; // if you want separate styling
import { setDoc, doc } from 'firebase/firestore'; // import setDoc
import { db } from '../firebase'; // Import from your firebase.js file


const Enroll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCourse, answers } = location.state || {};


  const [completionDate, setCompletionDate] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const auth = getAuth();
//   const db = getFirestore();

 

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in!');
        navigate('/Login');
        return;
      }
  
      const userRef = doc(db, 'users', user.uid); // reference to user document
  
      await setDoc(userRef, {
        enrolledCourses: arrayUnion({
          course: selectedCourse,
          deadline: completionDate,
          notificationsEnabled: notificationEnabled,
          answers: answers,  // 👈 add this line
          enrolledDate: new Date().toISOString()
        })
      }, { merge: true }); // Merge will not overwrite existing data
  
      alert('Enrolled Successfully!');
      navigate('/');
    } catch (error) {
      console.error('Enrollment Error:', error);
      alert(error.message);
    }
  };
  
  

  return (
    <div className="enroll_page">
        <div className="enroll_page_container">
        <h2>Enroll in {selectedCourse}</h2>
        <form onSubmit={handleEnrollSubmit} className="enroll_form">
            <label>
            Completion Date:
            <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                required
            />
            </label>
            <label>
            Daily Notifications:
            <input
                type="checkbox"
                checked={notificationEnabled}
                onChange={(e) => setNotificationEnabled(e.target.checked)}
            />
            </label>
            <button type="submit" className="submit_enroll_button">
            Confirm Enrollment
            </button>
        </form>
        </div>
    </div>
  );
};

export default Enroll;
