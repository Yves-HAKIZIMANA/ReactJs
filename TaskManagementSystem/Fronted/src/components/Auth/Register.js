import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/modules/authForm.scss';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', formData);
      navigate('/edit-profile');
      toast.success('Register successfully');
    } catch (err) {
      toast.error('Register failed');
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label htmlFor="email">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full names"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
