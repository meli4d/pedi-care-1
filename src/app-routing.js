import React from 'react';
import { Routes, Route } from "react-router-dom";

import InscrirePage from './views/Inscrire';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import NavBar from './components/NavBar';
import MainPage from './views/MainPage';

class AppRouting extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/inscrire" element={<InscrirePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

    )
  }

}

export default AppRouting;