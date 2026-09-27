import React from 'react';
import { Car, Bike, Truck, Navigation, Award, Compass, MapPin } from 'lucide-react';

export default function ParkingGrid({ spaces, selectedSpaceId, recommendedSpaceId, onSelectSpace }) {
  const rows = ['A', 'B', 'C', 'D', 'E'];

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bike': return <Bike size={16} />;
      case 'SUV': return <Truck size={16} />;
      default: return <Car size={16} />;
    }
  };

  return (
    <div className="parking-lot-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Compass className="icon-title" size={20} />
            Parking Lot Grid Layout (5 x 5 Matrix)
          </h3>
          <p className="card-subtitle">Click any space to inspect distance metrics and assigned vehicle details</p>
        </div>
        <div className="grid-legend">
          <div className="legend-item"><span className="legend-color status-available"></span> Available</div>
          <div className="legend-item"><span className="legend-color status-occupied"></span> Occupied</div>
          <div className="legend-item"><span className="legend-color status-reserved"></span> Reserved</div>
          <div className="legend-item"><span className="legend-color status-recommended"></span> Recommended</div>
        </div>
      </div>

      {/* Entrance Landmark Bar */}
      <div className="landmark-bar entrance-bar">
        <MapPin size={16} /> MAIN ENTRANCE GATE & ELEVATOR LIFT (ROW A SIDE)
      </div>

      <div className="parking-grid-container">
        {rows.map(rowLetter => (
          <div key={rowLetter} className="parking-grid-row">
            <div className="row-header-badge">Row {rowLetter}</div>
            <div className="row-spaces">
              {spaces
                .filter(s => s.row === rowLetter)
                .sort((a, b) => a.column - b.column)
                .map(space => {
                  const isRecommended = recommendedSpaceId === space.id;
                  const isSelected = selectedSpaceId === space.id;

                  let statusClass = `space-status-${space.status}`;
                  if (isRecommended) statusClass += ' is-recommended';
                  if (isSelected) statusClass += ' is-selected';

                  return (
                    <div
                      key={space.id}
                      className={`parking-space-cell ${statusClass}`}
                      onClick={() => onSelectSpace(space)}
                    >
                      {isRecommended && (
                        <div className="recommended-badge" title="Best Hill Climbing match">
                          <Award size={14} /> BEST
                        </div>
                      )}
                      
                      <div className="space-id">{space.id}</div>

                      <div className="space-type-badge">
                        {getVehicleIcon(space.allowedVehicleType)}
                        <span>{space.allowedVehicleType}</span>
                      </div>

                      <div className="space-footer">
                        {space.status === 'occupied' && space.assignedVehicle ? (
                          <div className="occupied-tag truncate">
                            {space.assignedVehicle.vehicleNumber || space.assignedVehicle.id}
                          </div>
                        ) : (
                          <div className="distance-tag">
                            <Navigation size={12} /> {space.distances?.entrance}m
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Exit Landmark Bar */}
      <div className="landmark-bar exit-bar">
        <MapPin size={16} /> EXIT GATE & ACADEMIC BLOCK / LIBRARY (ROW E SIDE)
      </div>
    </div>
  );
}
