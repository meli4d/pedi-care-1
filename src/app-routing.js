import React from 'react';
import { Routes, Route } from "react-router-dom";

import InscrirePage from './views/Inscrire';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import NavBar from './components/NavBar';
import MainPage from './views/MainPage';
import RDVsPage from './views/RDVsPage';
import PrendreRDVPage from './views/PrendreRDVPage';
import HomeMedecinPage from './views/HomeMedecinPage';

class AppRouting extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/inscrire" element={<InscrirePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pro" element={<HomeMedecinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rdvs" element={<RDVsPage />} />
          <Route path="/prendrerdv" element={<PrendreRDVPage />} />
        </Routes>
      </div>

    )
  }

}

export default AppRouting;