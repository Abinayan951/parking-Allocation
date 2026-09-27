import React from 'react';
import { TrendingDown, CheckCircle, XCircle, PlayCircle, ShieldCheck } from 'lucide-react';

export default function HillClimbingTable({ history, finalHeuristic, finalSpace }) {
  if (!history || history.length === 0) {
    return (
      <div className="hill-climbing-card placeholder-panel">
        <TrendingDown size={32} className="muted-icon" />
        <h4>Hill Climbing Optimization Log</h4>
        <p>Run the allocation algorithm to inspect real step-by-step neighbor state evaluations.</p>
      </div>
    );
  }

  return (
    <div className="hill-climbing-card">
      <div className="card-header">
        <div>
          <h3 className="card-title flex-center">
            <TrendingDown className="icon-title" size={20} />
            Hill Climbing Optimization Process
          </h3>
          <p className="card-subtitle">
            Local search neighborhood evaluation history (Steepest-Descent)
          </p>
        </div>
        <div className="opt-status-badge">
          <ShieldCheck size={16} /> Optimized
        </div>
      </div>

      <div className="table-responsive">
        <table className="hc-table">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>Tested Allocation</th>
              <th>Heuristic Value H(S)</th>
              <th>Evaluation Action</th>
              <th>Step Rationale</th>
            </tr>
          </thead>
          <tbody>
            {history.map((step, idx) => (
              <tr key={idx} className={`action-row-${step.action.toLowerCase()}`}>
                <td className="font-mono">#{step.iteration}</td>
                <td>
                  <span className="space-pill font-mono">{step.spaceId}</span>
                </td>
                <td>
                  <strong className="h-val font-mono">{step.heuristicValue}</strong>
                </td>
                <td>
                  {step.action === 'Start' && (
                    <span className="action-tag tag-start flex-center">
                      <PlayCircle size={14} /> Start
                    </span>
                  )}
                  {step.action === 'Accepted' && (
                    <span className="action-tag tag-accepted flex-center">
                      <CheckCircle size={14} /> Accepted
                    </span>
                  )}
                  {step.action === 'Rejected' && (
                    <span className="action-tag tag-rejected flex-center">
                      <XCircle size={14} /> Rejected
                    </span>
                  )}
                </td>
                <td className="text-muted text-sm">{step.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hc-summary-footer">
        <div className="final-stat">
          <span className="label">Final Selected Space:</span>
          <span className="val-highlight font-mono">{finalSpace?.id || 'N/A'}</span>
        </div>
        <div className="final-stat">
          <span className="label">Final Optimal Heuristic H(S):</span>
          <span className="val-highlight font-mono">{finalHeuristic}</span>
        </div>
        <div className="final-stat status-text">
          <span className="label">Optimization Status:</span>
          <span className="status-success">
            ✓ Local Minimum Reached — No better neighboring solution exists.
          </span>
        </div>
      </div>
    </div>
  );
}
