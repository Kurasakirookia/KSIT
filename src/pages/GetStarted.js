import React from 'react'
import GetStartedData from "../data/GetStartedData"
import { useState } from 'react'
import "../css/GetStarted.css"
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const GetStarted = () => {
  const navigate=useNavigate();
  const location =useLocation();
  const selectedCourse=location.state;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = GetStartedData[currentStep];

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: option,
    }));
  };

  const generateRoadmap = () => {
    console.log("Selected Course:", selectedCourse); // passed via state or context
    console.log("User Answers:", answers);
  
   
    navigate("/roadmap", { state: { answers, selectedCourse } });
  };



  return (
    <div className='getstarted'>
      <div className="coursecontainer">
        <h2 id='course'>{selectedCourse}</h2>
      </div>
      
      <div className="question_container">
        <h4 id='question' >{currentQuestion.question}</h4>
        <ul className="options">
        {currentQuestion.options.map((option, index) => (
          <li>
            <label>
              <input type="radio"
                 name={`question-${currentStep}`}
                 value={option}
                 checked={answers[currentQuestion.key] === option}
                onChange={() => handleOptionSelect(option)} />
              {option}
            </label>
          </li>
        ))}
        </ul>
        <div className="button_container">
          <button
            onClick={() => {
              if (currentStep < GetStartedData.length - 1) {
                setCurrentStep(currentStep + 1);
              } 
              else {
                console.log("All answers submitted:", answers);
                Object.entries(answers).forEach(([key, value]) => {
                  console.log(`${key}: ${value}`);
                });
                generateRoadmap();
               
              }
             
            }}
            disabled={!answers[currentQuestion.key]}
          >
            {currentStep === GetStartedData.length - 1 ? "Submit" : "Next"}
          </button>


          </div>
      </div>
    </div>
  )
}

export default GetStarted
