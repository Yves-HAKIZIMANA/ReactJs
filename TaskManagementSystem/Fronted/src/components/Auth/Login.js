import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../../styles/modules/authForm.scss';
import { setLogin } from '../../State';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/login',
        formData,
        { withCredentials: true }
      );
      const { data } = res;
      dispatch(setLogin({ user: data.user, token: data.token }));
      if (res) {
        navigate('/');
        toast.success('Logged in successfully');
        setFormData({ email: '', password: '' });
      }
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
