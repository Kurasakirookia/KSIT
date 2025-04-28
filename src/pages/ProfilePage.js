// import React from 'react'
// import { useState } from 'react'
// import courses from "../data/CoursesData"
// import { useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import view_more from "../assets/view_more_icon.png"
// import profilelogo from "../assets/profile_logo.png"
// import { auth, db } from '../firebase'; // import db from firebase.js
// import { getDoc, doc } from 'firebase/firestore';
// import "../css/ProfilePage.css"

// const ProfilePage = () => {

    
//     const [searchTerm, setSearchTerm] = useState('');
  
//     const filteredCourses = courses.filter(course =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
  
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const fetchUserData = async () => {
//         const user = auth.currentUser;
//         if (user) {
//           try {
//             const userRef = doc(db, 'users', user.uid);
//             const userSnap = await getDoc(userRef);
  
//             if (userSnap.exists()) {
//               setUserData(userSnap.data());
//             }
//           } catch (error) {
//             console.error('Error fetching user data:', error);
//           } finally {
//             setLoading(false);
//           }
//         } else {
//           navigate('/Login'); // if not logged in, send back to Login
//         }
//       };
  
//       fetchUserData();
//     }, [navigate]);
  
//     if (loading) {
//       return <p>Loading Profile...</p>;
//     }
   
//   return (

    

//     <div className='profile_container'>
        
//         <div className="profile_pic_container">
//             <div className="profile_pic_content"> <img src={profilelogo} alt="profilelogo" className='profile_section_image' />
//             <p id='username'>name</p>
//             </div>
           
//         </div>
//         <div className="enrolled_courses">
//             {/* component of the search bar of enrolled courses  */}
            

//         </div>
      
//     </div>
//   )
// }

// export default ProfilePage

import React, { useState, useEffect, useRef } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import profilelogo from "../assets/profile_logo.png";
import "../css/ProfilePage.css";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const auth = getAuth();
  const storage = getStorage();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/Login'); // if not logged in, redirect to login
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageClick = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      // Update photoURL in Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        photoURL: downloadURL,
      });

      alert('Profile picture updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture.');
    }
  };

  if (loading) {
    return <p>Loading Profile...</p>;
  }

  return (
    <div className="profile_container">
      
      {/* Profile Pic Section */}
      <div className="profile_pic_container">
        <div className="profile_pic_content" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <img
            src={(auth.currentUser?.photoURL || profilelogo) + '?' + new Date().getTime()}
            alt="Profile Pic"
            className="profile_section_image"
            />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <p id="username">{auth.currentUser?.email || "User"}</p>
          <p className="click_to_change">(Click to change photo)</p>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="enrolled_courses">
        <h2>Your Enrolled Courses</h2>
        {userData?.enrolledCourses?.length > 0 ? (
          <ul className="course_list">
            {userData.enrolledCourses.map((course, idx) => (
              <li key={course.id} className="course_item">
                <h3>{course.course}</h3>
                <p>Complete by: {course.deadline}</p>
                <p>Daily Notifications: {course.notificationsEnabled ? "Enabled" : "Disabled"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </div>

    </div>
  );
};

export default ProfilePage;
