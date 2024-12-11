import React from 'react';
import PropositionalBasics from '../components/theory/PropositionalBasics';
import LogicalOperators from '../components/theory/LogicalOperators';
import TruthTableTheory from '../components/theory/TruthTableTheory';
import LogicalEquivalence from '../components/theory/LogicalEquivalence';
import ExamplesSection from '../components/theory/ExamplesSection';
import { FaBook } from 'react-icons/fa';

function TheoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <FaBook className="text-3xl text-gray-700" />
        <h1 className="text-3xl font-bold">Teoría de Lógica Proposicional</h1>
      </div>

      <div className="space-y-8">
        <PropositionalBasics />
        <LogicalOperators />
        <TruthTableTheory />
        <LogicalEquivalence />
        <ExamplesSection />
      </div>
    </div>
  );
}

export default TheoryPage;