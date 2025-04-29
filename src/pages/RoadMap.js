
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import "../css/RoadMap.css"; // Optional, for custom styling later

// const Roadmap = () => {
//   const location = useLocation();
//   const { roadmapData, selectedCourse, answers } = location.state || {};

//   if (!roadmapData) {
//     return <div>Loading roadmap...</div>;
//   }

//   const hasRoadmapArray = Array.isArray(roadmapData.roadmap);

//   return (
//     <div className="roadmap-container">
//       <h1 className="roadmap-title">Roadmap for {selectedCourse}</h1>

//       {hasRoadmapArray ? (
//         roadmapData.roadmap.map((module, moduleIndex) => (
//           <div key={moduleIndex} className="module">
//             <h2 className="module-title">{module.module}</h2>

//             {module.chapters.map((chapter, chapterIndex) => (
//               <div key={chapterIndex} className="chapter">
//                 <h3 className="chapter-title">
//                   {chapter.chapter_title} ({chapter.duration})
//                 </h3>
//                 <p className="chapter-description">{chapter.description}</p>
//                 <p><strong>Goal:</strong> {chapter.goal}</p>

//                 <div className="resources">
//                   <strong>Resources:</strong>
//                   <ul>
//                     {chapter.resources.map((resource, resourceIndex) => (
//                       <li key={resourceIndex}>
//                         <a href={resource} target="_blank" rel="noopener noreferrer">
//                           {resource}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <p className="mini-project">
//                   <strong>Mini Project:</strong> {chapter.mini_project}
//                 </p>

//                 <hr />
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <div className="raw-output">
//           <h2>⚡ Raw DeepSeek Output:</h2>
//           <pre>{JSON.stringify(roadmapData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../css/RoadMap.css"; // Optional styling

const Roadmap = () => {
  const location = useLocation();
  const { roadmapData, selectedCourse } = location.state || {};

  const [rawOutput, setRawOutput] = useState('');

  useEffect(() => {
    if (roadmapData) {
      if (roadmapData.raw_response) {
        setRawOutput(roadmapData.raw_response);
      } else if (roadmapData.roadmap) {
        // Fallback: convert the structured roadmap object into readable text
        setRawOutput(JSON.stringify(roadmapData, null, 2));
      } else {
        setRawOutput('No roadmap data available.');
      }
    }
  }, [roadmapData]);

  if (!rawOutput) {
    return <div>Loading roadmap...</div>;
  }

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">Raw Output for {selectedCourse}</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {rawOutput}
      </pre>
    </div>
  );
};

export default Roadmap;
