// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import GetStartedData from "../data/GetStartedData";
// import "../css/GetStarted.css";

// const GetStarted = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const selectedCourse = location.state;

//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(false); // Added loading

//   const currentQuestion = GetStartedData[currentStep];

//   // Insert selected course into q0 on component mount
//   useEffect(() => {
//     if (selectedCourse) {
//       setAnswers((prev) => ({
//         ...prev,
//         q0: selectedCourse,
//       }));
//     }
//   }, [selectedCourse]);

//   const handleOptionSelect = (option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.id]: option,
//     }));
//   };

//   const generateRoadmap = async () => {
//     console.log("User Answers (sent to backend):", answers);
  
//     setLoading(true); // start loading
//     console.log("Sending answers:", answers);

//     try {
//       const response = await fetch('http://localhost:8000/generate-roadmap', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(answers),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to generate roadmap');
//       }
  
//       const generatedRoadmap = await response.json();
  
//       // ✅ FIX: Pass selectedCourse also
//       navigate("/RoadMap", {
//         state: {
//           answers,
//           roadmapData: generatedRoadmap,
//           selectedCourse: selectedCourse,  // <--- add this
//         }
//       });
  
//     } catch (error) {
//       console.error("Error generating roadmap:", error);
//       alert("Something went wrong while generating roadmap.");
//     } finally {
//       setLoading(false); // stop loading
//     }
//   };
  

//   const handleNext = () => {
//     if (currentStep < GetStartedData.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Before submitting, check all required questions are answered
//       const unanswered = GetStartedData.filter(q => !(q.id in answers));
//       if (unanswered.length > 0) {
//         alert(`Please answer all questions before submitting.`);
//         return; // Don't submit
//       }
  
//       console.log("All answers submitted:", answers);
//       Object.entries(answers).forEach(([key, value]) => {
//         console.log(`${key}: ${value}`);
//       });
//       generateRoadmap();
//     }
//   };

//   return (
//     <div className="getstarted">
//       <div className="coursecontainer">
//         <h2 id="course">{selectedCourse}</h2>
//       </div>

//       <div className="question_container">
//         <h4 id="question">{currentQuestion.question}</h4>
//         <ul className="options">
//           {currentQuestion.options.map((option, index) => (
//             <li key={index}>
//               <label>
//                 <input
//                   type="radio"
//                   name={`question-${currentStep}`}
//                   value={option}
//                   checked={answers[currentQuestion.id] === option}
//                   onChange={() => handleOptionSelect(option)}
//                   disabled={loading} // Disable while loading
//                 />
//                 {option}
//               </label>
//             </li>
//           ))}
//         </ul>

//         <div className="button_container">
//           <button
//             onClick={handleNext}
//             disabled={
//               (currentStep !== GetStartedData.length - 1 && !answers[currentQuestion.id]) || loading
//             }
//           >
//             {loading
//               ? "Generating..."
//               : currentStep === GetStartedData.length - 1
//               ? "Submit"
//               : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetStarted;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GetStartedData from "../data/GetStartedData";
import "../css/GetStarted.css";

import form_0 from "../assets/forms_0.png";
import form_1 from "../assets/forms_1.png";

const GetStarted = () => {
  const location = useLocation();
  const selectedCourse = location.state;

  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false); // ✅ ADDED

  const handleOptionSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    const unanswered = GetStartedData.filter(q => !(q.id in answers));
    if (unanswered.length > 0) {
      setShowWarning(true); // ✅ ADDED
      setTimeout(() => setShowWarning(false), 5000); // ✅ ADDED
      return;
    }

    console.log("Submitted Answers:", answers);
    // trigger generateRoadmap() here later
  };

  return (
    <div className="getstarted_root">
      <img src={form_0} alt="" className='formimage left' />
      <img src={form_1} alt="" className='formimage right' />

      <div className="getstarted">
        {/* ✅ ADDED: Warning popup */}
        {showWarning && (
          <div className="warning-popup">
            Please answer all questions before submitting.
          </div>
        )}

        <div className="coursecontainer">
          <h2 id="course">{selectedCourse?.title || "Selected Course"}</h2>
        </div>

        <form className="question_form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {GetStartedData.map((question, index) => (
            <div className="question_block" key={question.id}>
              <h4 className="question">{question.question}</h4>
              <ul className="options">
                {question.options.map((option, i) => (
                  <li key={i} className='question_options'>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleOptionSelect(question.id, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="button_container">
            <button type="submit" className='box submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
