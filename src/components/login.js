import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation for empty fields
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // Retrieve stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // Check if storedUserData exists and if email and password match
    if (
      storedUserData &&
      storedUserData.email === formData.email &&
      storedUserData.password === formData.password
    ) {
      // If email and password match
      alert('Login successful!');
      navigate('/employees'); // Redirect to Employee Form or desired page
      setFormData({ email: '', password: '' }); // Reset the form
    } else {
      // If email or password don't match
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Here</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
