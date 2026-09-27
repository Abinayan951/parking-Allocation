import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

export default function ResetModal({ onConfirm, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <AlertTriangle size={24} className="modal-icon text-warning" />
            <div>
              <h3>Reset Parking Lot</h3>
              <p>Confirm reset to initial demo dataset</p>
            </div>
          </div>
          <button className="btn-icon-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body text-center py-4">
          <p>
            Are you sure you want to reset the parking lot state? This will clear all newly parked vehicles and restore the 25 default parking spaces.
          </p>
        </div>

        <div className="modal-footer flex-center gap-3">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <RotateCcw size={16} /> Yes, Reset Parking Lot
          </button>
        </div>
      </div>
    </div>
  );
}
