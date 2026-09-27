import React from 'react';
import { LayoutGrid, CheckCircle2, AlertCircle, Clock, Zap, ShieldCheck } from 'lucide-react';

export default function DashboardCards({ spaces, waitingCount, currentHeuristicCost, isAllocating }) {
  const totalSpaces = spaces.length;
  const availableSpaces = spaces.filter(s => s.status === 'available').length;
  const occupiedSpaces = spaces.filter(s => s.status === 'occupied').length;
  const reservedSpaces = spaces.filter(s => s.status === 'reserved').length;

  return (
    <div className="dashboard-cards-grid">
      <div className="stat-card stat-total">
        <div className="stat-icon-wrapper">
          <LayoutGrid size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Spaces</span>
          <span className="stat-value">{totalSpaces}</span>
          <span className="stat-sub">5x5 Parking Layout</span>
        </div>
      </div>

      <div className="stat-card stat-available">
        <div className="stat-icon-wrapper">
          <CheckCircle2 size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Available</span>
          <span className="stat-value">{availableSpaces}</span>
          <span className="stat-sub">{((availableSpaces / totalSpaces) * 100).toFixed(0)}% Open Capacity</span>
        </div>
      </div>

      <div className="stat-card stat-occupied">
        <div className="stat-icon-wrapper">
          <AlertCircle size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Occupied</span>
          <span className="stat-value">{occupiedSpaces}</span>
          <span className="stat-sub">{reservedSpaces} Reserved</span>
        </div>
      </div>

      <div className="stat-card stat-waiting">
        <div className="stat-icon-wrapper">
          <Clock size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Vehicles Waiting</span>
          <span className="stat-value">{waitingCount}</span>
          <span className="stat-sub">In Queue</span>
        </div>
      </div>

      <div className="stat-card stat-cost">
        <div className="stat-icon-wrapper">
          <Zap size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Current Cost H(S)</span>
          <span className="stat-value">{currentHeuristicCost !== null ? currentHeuristicCost : '--'}</span>
          <span className="stat-sub">Minimization Goal</span>
        </div>
      </div>

      <div className="stat-card stat-status">
        <div className="stat-icon-wrapper">
          <ShieldCheck size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-label">System Status</span>
          <span className="stat-value status-badge-pill">
            {isAllocating ? 'Hill Climbing...' : 'Ready'}
          </span>
          <span className="stat-sub">Heuristic Active</span>
        </div>
      </div>
    </div>
  );
}
