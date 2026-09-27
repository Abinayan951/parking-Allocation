import React from 'react';
import { Calculator, Zap, HelpCircle } from 'lucide-react';

export default function HeuristicPanel({ metrics, selectedSpace, currentVehicle }) {
  if (!metrics) {
    return (
      <div className="heuristic-panel-card placeholder-panel">
        <Calculator size={32} className="muted-icon" />
        <h4>Heuristic Calculation Panel</h4>
        <p>Run the allocation algorithm or select a space to calculate dynamic heuristic cost H(S).</p>
      </div>
    );
  }

  const { distance: D, conflicts: C, priorityPenalty: P, underUtilization: U, heuristicValue: H } = metrics;

  const termD = 5 * D;
  const termC = 100 * C;
  const termP = 20 * P;
  const termU = 10 * U;

  return (
    <div className="heuristic-panel-card">
      <div className="card-header">
        <div>
          <h3 className="card-title flex-center">
            <Calculator className="icon-title" size={20} />
            Heuristic Function H(S) Calculation
          </h3>
          <p className="card-subtitle">
            Minimization Goal: Lower Heuristic Score = Higher Quality Allocation
          </p>
        </div>
        <div className="h-score-badge">
          H(S) = <span className="score-num">{H}</span>
        </div>
      </div>

      <div className="formula-hero-box">
        <div className="formula-title">Exact Mathematical Heuristic Formula:</div>
        <div className="formula-math">
          H(S) = <span className="term-d">5(D)</span> + <span className="term-c">100(C)</span> + <span className="term-p">20(P)</span> + <span className="term-u">10(U)</span>
        </div>
      </div>

      <div className="calculation-steps">
        <div className="step-row">
          <span className="step-label">1. Variable Values:</span>
          <span className="step-value">
            D = {D}m, C = {C}, P = {P}, U = {U}
          </span>
        </div>

        <div className="step-row">
          <span className="step-label">2. Weighted Terms:</span>
          <span className="step-value">
            5({D}) + 100({C}) + 20({P}) + 10({U})
          </span>
        </div>

        <div className="step-row">
          <span className="step-label">3. Component Totals:</span>
          <span className="step-value">
            {termD} + {termC} + {termP} + {termU}
          </span>
        </div>

        <div className="step-row final-result">
          <span className="step-label">4. Final Heuristic Cost:</span>
          <span className="step-value highlight-h">H(S) = {H}</span>
        </div>
      </div>

      <div className="variable-grid">
        <div className="var-card card-d">
          <div className="var-header">
            <span className="var-name">D (Distance)</span>
            <span className="var-weight">Weight: 5</span>
          </div>
          <div className="var-val">{D} meters</div>
          <div className="var-sub">Walking distance to {currentVehicle?.destination || 'Destination'}</div>
        </div>

        <div className="var-card card-c">
          <div className="var-header">
            <span className="var-name">C (Conflicts)</span>
            <span className="var-weight">Weight: 100</span>
          </div>
          <div className="var-val">{C} conflicts</div>
          <div className="var-sub">Type mismatches & space occupation</div>
        </div>

        <div className="var-card card-p">
          <div className="var-header">
            <span className="var-name">P (Priority Penalty)</span>
            <span className="var-weight">Weight: 20</span>
          </div>
          <div className="var-val">{P} penalty</div>
          <div className="var-sub">Penalty for high priority vehicle mismatch</div>
        </div>

        <div className="var-card card-u">
          <div className="var-header">
            <span className="var-name">U (Under-utilization)</span>
            <span className="var-weight">Weight: 10</span>
          </div>
          <div className="var-val">{U} mismatch</div>
          <div className="var-sub">Spot capacity vs vehicle size mismatch</div>
        </div>
      </div>
    </div>
  );
}
