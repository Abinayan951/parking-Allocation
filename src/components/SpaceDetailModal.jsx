import React from 'react';
import { X, MapPin, Navigation, Car, Bike, Truck, ShieldAlert, CheckCircle } from 'lucide-react';

export default function SpaceDetailModal({ space, onClose }) {
  if (!space) return null;

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bike': return <Bike size={18} />;
      case 'SUV': return <Truck size={18} />;
      default: return <Car size={18} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content space-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <MapPin size={22} className="modal-icon" />
            <div>
              <h3>Parking Space Details: {space.id}</h3>
              <p>Grid Row {space.row}, Column {space.column}</p>
            </div>
          </div>
          <button className="btn-icon-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="space-status-banner" data-status={space.status}>
            {space.status === 'available' && <CheckCircle size={20} />}
            {space.status === 'occupied' && <ShieldAlert size={20} />}
            {space.status === 'reserved' && <ShieldAlert size={20} />}
            <span className="capitalize">Status: {space.status}</span>
          </div>

          <div className="detail-section">
            <h4 className="section-subtitle">Space Specifications</h4>
            <div className="info-grid">
              <div className="info-box">
                <span className="info-label">Allowed Vehicle Type</span>
                <span className="info-value flex-center">
                  {getVehicleIcon(space.allowedVehicleType)}
                  {space.allowedVehicleType}
                </span>
              </div>
              <div className="info-box">
                <span className="info-label">Grid Coordinates</span>
                <span className="info-value">Row {space.row} / Col {space.column}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="section-subtitle">
              <Navigation size={16} /> Proximity & Walking Distances
            </h4>
            <div className="distances-grid">
              <div className="distance-item">
                <span className="dist-label">Main Entrance</span>
                <span className="dist-value">{space.distances?.entrance} meters</span>
              </div>
              <div className="distance-item">
                <span className="dist-label">Exit Gate</span>
                <span className="dist-value">{space.distances?.exit} meters</span>
              </div>
              <div className="distance-item">
                <span className="dist-label">Elevator / Lift</span>
                <span className="dist-value">{space.distances?.lift} meters</span>
              </div>
              <div className="distance-item">
                <span className="dist-label">Academic Block</span>
                <span className="dist-value">{space.distances?.academicBlock} meters</span>
              </div>
              <div className="distance-item">
                <span className="dist-label">Library</span>
                <span className="dist-value">{space.distances?.library} meters</span>
              </div>
            </div>
          </div>

          {space.status === 'occupied' && space.assignedVehicle && (
            <div className="detail-section vehicle-occupied-box">
              <h4 className="section-subtitle">Assigned Vehicle</h4>
              <div className="vehicle-card-mini">
                <div>
                  <strong>{space.assignedVehicle.vehicleNumber || 'Reg. No N/A'}</strong>
                  <div className="text-muted">ID: {space.assignedVehicle.id} | Type: {space.assignedVehicle.type}</div>
                </div>
                <div className="priority-tag" data-priority={space.assignedVehicle.priority}>
                  {space.assignedVehicle.priority} Priority
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
