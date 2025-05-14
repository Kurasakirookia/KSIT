
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import "../css/RoadMap.css"; // Optional styling

// const Roadmap = () => {
//   const location = useLocation();
//   const { roadmapData, selectedCourse } = location.state || {};

//   const [rawOutput, setRawOutput] = useState('');

//   useEffect(() => {
//     if (roadmapData) {
//       if (roadmapData.raw_response) {
//         setRawOutput(roadmapData.raw_response);
//       } else if (roadmapData.roadmap) {
//         // Fallback: convert the structured roadmap object into readable text
//         setRawOutput(JSON.stringify(roadmapData, null, 2));
//       } else {
//         setRawOutput('No roadmap data available.');
//       }
//     }
//   }, [roadmapData]);

//   if (!rawOutput) {
//     return <div>Loading roadmap...</div>;
//   }

//   return (
//     <div className="roadmap-container">
//       <h1 className="roadmap-title">Raw Output for {selectedCourse}</h1>
//       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//         {rawOutput}
//       </pre>
//     </div>
//   );
// };

// export default Roadmap;

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/RoadMap.css'; // You can create and customize this file

const RoadMap = () => {
  const location = useLocation();
  const roadmap = location.state?.roadmap;

  if (!roadmap) {
    return <div>No roadmap data provided.</div>;
  }

  return (
    <div className="roadmap-root">
      <h1>Your Personalized Roadmap</h1>
      {roadmap.modules.map((module, i) => (
        <div key={i} className="module">
          <h2>{module.title}</h2>
          <ul>
            {module.chapters.map((chapter, j) => (
              <li key={j}>
                <h4>{chapter.title}</h4>
                <p>{chapter.description}</p>
                {chapter.references.map((link, k) => (
                  <a key={k} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadMap;
