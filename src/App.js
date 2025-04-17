
import './App.css';
import HomePage from './pages/HomePage';
import GetStarted from './pages/GetStarted';
import Layout from './components/Layout';
import Courses from './pages/Courses';
import RoadMap from './pages/RoadMap';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route  path="/" element={<HomePage/>}/>
          <Route path="/Courses" element={<Courses/>}/>
          <Route path="/GetStarted" element={<GetStarted/>}/>
          <Route  path="/RoadMap" element={<RoadMap/>}/>
          
        </Route>
      </Routes>
    </Router>
    
   
  );
}

export default App;
