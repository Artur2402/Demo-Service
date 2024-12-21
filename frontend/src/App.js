import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CompaniesList from './components/CompaniesList';
import CompanyDetails from './components/CompanyDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompaniesList />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
