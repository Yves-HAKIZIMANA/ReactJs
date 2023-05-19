import React from 'react';
import Layout from '../components/Layout';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
// import './Auth.css';

const Auth = () => (
  <Layout>
    <div className="form-container">
      <Login />
      <Register />
    </div>
  </Layout>
);

export default Auth;
