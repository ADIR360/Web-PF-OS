import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Arush from './components/Arush/Arush'; // Import the new Arush component
import EmailApp from './components/EmailApp/EmailApp';
import RubiksCube from './components/RubiksCube/RubiksCube';
import GitHubApp from './components/GitHubApp/GitHubApp';
import LinkedInApp from './components/LinkedInApp/LinkedInApp';
import HomeScreen from './components/HomeScreen/HomeScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Arush />} /> 
        <Route path="/email" element={<EmailApp />} />
        <Route path="/RubiksCube" element={<RubiksCube />} />
        <Route path="/github" element={<GitHubApp />} />
        <Route path="/linkedin" element={<LinkedInApp />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
