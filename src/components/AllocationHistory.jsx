import React from 'react';
import { History, Trash2, Calendar, CheckCircle } from 'lucide-react';

export default function AllocationHistory({ historyList, onClearHistory }) {
  if (!historyList || historyList.length === 0) {
    return (
      <div className="history-card placeholder-panel">
        <History size={32} className="muted-icon" />
        <h4>Allocation History Log</h4>
        <p>No previous allocations recorded yet. Allocate a vehicle to log history.</p>
      </div>
    );
  }

  return (
    <div className="history-card">
      <div className="card-header">
        <div>
          <h3 className="card-title flex-center">
            <History className="icon-title" size={20} />
            System Allocation History
          </h3>
          <p className="card-subtitle">
            Persisted history log of Hill Climbing allocations (Stored in LocalStorage)
          </p>
        </div>
        <button className="btn btn-danger-outline btn-sm" onClick={onClearHistory}>
          <Trash2 size={16} /> Clear History
        </button>
      </div>

      <div className="table-responsive">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Vehicle ID</th>
              <th>Registration No</th>
              <th>Vehicle Type</th>
              <th>Allocated Space</th>
              <th>Heuristic Cost H(S)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyList.map((item, index) => (
              <tr key={index}>
                <td className="font-mono text-sm">
                  <span className="flex-center gap-1">
                    <Calendar size={12} /> {item.timestamp}
                  </span>
                </td>
                <td className="font-mono">{item.vehicleId}</td>
                <td className="font-mono">{item.vehicleNumber || 'N/A'}</td>
                <td>{item.vehicleType}</td>
                <td>
                  <span className="space-pill font-mono">{item.parkingSpaceId}</span>
                </td>
                <td className="font-mono strong-cost">{item.heuristicValue}</td>
                <td>
                  <span className="status-completed flex-center gap-1">
                    <CheckCircle size={14} /> {item.status || 'Completed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
