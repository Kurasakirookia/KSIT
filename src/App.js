
import './App.css';
import HomePage from './pages/HomePage';
import GetStarted from './pages/GetStarted';
import Layout from './components/Layout';
import Courses from './pages/Courses';

import RoadMap from './pages/RoadMap';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Enroll from './pages/Enroll';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>

          <Route  path="/Login" element={<Login/>}/>
          <Route  path="/Signup" element={<Signup/>}/>

          <Route  path="/" element={<HomePage/>}/>
          <Route path="/Courses" element={<Courses/>}/>
          <Route path="/GetStarted" element={<GetStarted/>}/>
          <Route  path="/RoadMap" element={<RoadMap/>}/>
          <Route  path="/RoadMap" element={<RoadMap/>}/>
          <Route  path="/ForgotPassword" element={<ForgotPassword/>}/>
          <Route  path="/Enroll" element={<Enroll/>}/>
          <Route  path="/Profilepage" element={<ProfilePage/>}/>

          
          
        </Route>
      </Routes>
    </Router>
    
   
  );
}

export default App;
