import React from 'react';
import { Car, HelpCircle, RotateCcw, Cpu } from 'lucide-react';

export default function Navbar({ onOpenVivaModal, onOpenResetModal }) {
  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <div className="brand-logo">
          <Car className="brand-icon" size={28} />
        </div>
        <div>
          <h1 className="brand-title">SmartPark</h1>
          <p className="brand-subtitle">Heuristic-Based Parking Space Allocation System (MCA Practical)</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="btn btn-secondary" onClick={onOpenVivaModal}>
          <HelpCircle size={18} />
          <span>About Algorithm (Viva Prep)</span>
        </button>
        <button className="btn btn-danger-outline" onClick={onOpenResetModal}>
          <RotateCcw size={18} />
          <span>Reset Parking Lot</span>
        </button>
      </div>
    </header>
  );
}
