import React from 'react';
import PageTitle from '../components/PageTitle';
import style from '../styles/modules/app.module.scss';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import Navbar from '../components/Navbar';

function App() {
  return (
    <div className="container">
      <Navbar />
      <PageTitle>TODOLIST</PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
  );
}

export default App;
