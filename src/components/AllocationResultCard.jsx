import React from 'react';
import { Award, Check, Navigation, Car, Bike, Truck, ArrowRight } from 'lucide-react';

export default function AllocationResultCard({ allocationResult, vehicle, onConfirmAllocation }) {
  if (!allocationResult || !allocationResult.success) {
    if (allocationResult && !allocationResult.success) {
      return (
        <div className="allocation-result-card card-error">
          <h3>Allocation Failed</h3>
          <p>{allocationResult.message}</p>
        </div>
      );
    }
    return null;
  }

  const { finalSpace, finalHeuristic, metrics, reason } = allocationResult;

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bike': return <Bike size={18} />;
      case 'SUV': return <Truck size={18} />;
      default: return <Car size={18} />;
    }
  };

  return (
    <div className="allocation-result-card">
      <div className="card-header">
        <div className="flex-center gap-2">
          <Award className="award-icon" size={24} />
          <div>
            <h3 className="card-title">Hill Climbing Allocation Result</h3>
            <p className="card-subtitle">Optimal Parking Assignment Found</p>
          </div>
        </div>
        <div className="space-winner-pill">
          Recommended: <strong className="winner-id">{finalSpace.id}</strong>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-column vehicle-summary">
          <h4 className="col-title">Vehicle Details</h4>
          <div className="summary-list">
            <div className="sum-item">
              <span className="lbl">Vehicle ID:</span>
              <span className="val font-mono">{vehicle.id}</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Reg Number:</span>
              <span className="val font-mono">{vehicle.vehicleNumber}</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Type:</span>
              <span className="val flex-center gap-1">
                {getVehicleIcon(vehicle.type)} {vehicle.type}
              </span>
            </div>
            <div className="sum-item">
              <span className="lbl">Priority:</span>
              <span className="val priority-badge" data-priority={vehicle.priority}>
                {vehicle.priority}
              </span>
            </div>
            <div className="sum-item">
              <span className="lbl">Destination:</span>
              <span className="val">{vehicle.destination}</span>
            </div>
          </div>
        </div>

        <div className="result-column space-summary">
          <h4 className="col-title">Recommended Space</h4>
          <div className="summary-list">
            <div className="sum-item">
              <span className="lbl">Space ID:</span>
              <span className="val space-highlight font-mono">{finalSpace.id}</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Walking Distance:</span>
              <span className="val font-mono">{metrics.distance} meters</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Vehicle Allowed:</span>
              <span className="val">{finalSpace.allowedVehicleType}</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Heuristic Cost H(S):</span>
              <span className="val cost-highlight font-mono">{finalHeuristic}</span>
            </div>
            <div className="sum-item">
              <span className="lbl">Current Status:</span>
              <span className="val capitalize">{finalSpace.status}</span>
            </div>
          </div>
        </div>

        <div className="result-column reason-summary">
          <h4 className="col-title">Selection Rationale</h4>
          <ul className="reason-bullets">
            {reason.map((r, i) => (
              <li key={i}>
                <Check size={16} className="check-icon" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-action-bar">
        <button
          className="btn btn-success btn-lg btn-block flex-center gap-2"
          onClick={() => onConfirmAllocation(vehicle, finalSpace, allocationResult)}
        >
          <span>Confirm & Occupy Space {finalSpace.id}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
