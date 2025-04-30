
import './App.css';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Courses from './pages/Courses'
import RoadMap from './pages/RoadMap';
import Login from './pages/Login'
import SignUp from './pages/Signup'

import Layout from './components/Layout'
import GetStarted from './pages/GetStarted';
import ProfilePage from './pages/ProfilePage';
import Test from './Procotoring/test'


import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>


          <Route  path="/Login" element={<Login/>}/>
          <Route  path="/Signup" element={<SignUp/>}/>
          <Route  path="/" element={<LandingPage/>}/>


          <Route  path="/selectcourse" element={<HomePage/>}/>
          <Route path="/Courses" element={<Courses/>}/>
          <Route path="/GetStarted" element={<GetStarted/>}/>
          <Route path="/RoadMap" element={<RoadMap/>}/>
          <Route path="/ProfilePage" element={<ProfilePage/>}/>
          <Route path="/Test" element={<Test/>}/>
          
          
          
         

          
          
        </Route>
      </Routes>
    </Router>
    
   
  );
}

export default App;
