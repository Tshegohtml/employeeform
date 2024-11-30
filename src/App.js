import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router, Routes, and Link
import Register from './components/register';
import EmployeeInformation from './components/form'; // Employee form component
import Login from './components/login'; // Login component

function App() {
  const [Information, setInformation] = useState([]);

  return (
    <Router>
      <div className="App">
       
        
        <Routes>
          <Route path="/" element={<Register />} /> {/* Default route to Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<EmployeeInformation />} /> {/* Route for Employee Form */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
