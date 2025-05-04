import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TruthTablesPage from './pages/TruthTablesPage';
import TheoryPage from './pages/TheoryPage';
import PropertiesAnalysisPage from './pages/PropertiesAnalysisPage';
import NormalFormsPage from './pages/NormalFormsPage';
import SyntaxTreePage from './pages/SyntaxTreePage';
import LogicCircuitsPage from './pages/LogicCircuitsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/truth-tables" element={<TruthTablesPage />} />
            <Route path="/theory" element={<TheoryPage />} />
            <Route path="/properties-analysis" element={<PropertiesAnalysisPage />} />
            <Route path="/normal-forms" element={<NormalFormsPage />} />
            <Route path="/syntax-trees" element={<SyntaxTreePage />} />
            <Route path="/logic-circuits" element={<LogicCircuitsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;