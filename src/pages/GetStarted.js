
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GetStartedData from "../data/GetStartedData";
import "../css/GetStarted.css";

import form_0 from "../assets/forms_0.png";
import form_1 from "../assets/forms_1.png";
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../api/generateRoadmap';

const GetStarted = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    const unanswered = GetStartedData.filter(q => !(q.id in answers));
    if (unanswered.length > 0) {
      setShowWarning(true); // ✅ ADDED
      setTimeout(() => setShowWarning(false), 5000); // ✅ ADDED
      return;
    }

   console.log("🟡 Submitting answers:", answers); // already exists
    try {
      console.log("⚙️ Calling generateRoadmap...");
      const roadmapData = await generateRoadmap(answers);
      console.log("✅ Roadmap Data:", roadmapData);

      navigate('/RoadMap', { state: { roadmap: roadmapData } });
    } catch (error) {
      console.error("❌ Error generating roadmap:", error);
    }

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
