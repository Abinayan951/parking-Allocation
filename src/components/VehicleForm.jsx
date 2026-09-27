import React, { useState } from 'react';
import { PlusCircle, Play, Sparkles, Check, AlertCircle } from 'lucide-react';
import { sampleVehicles } from '../data/sampleVehicles';

export default function VehicleForm({ onAllocate, isAllocating }) {
  const [formData, setFormData] = useState({
    id: `V${Math.floor(100 + Math.random() * 900)}`,
    vehicleNumber: 'TN38AB1234',
    type: 'Car',
    priority: 'High',
    duration: 3,
    destination: 'Main Entrance',
    preference: 'Near Entrance'
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSelectPreset = (sample) => {
    setFormData({
      ...sample,
      id: `V${Math.floor(100 + Math.random() * 900)}`
    });
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vehicleNumber.trim()) {
      setValidationError('Please enter a valid Vehicle Registration Number.');
      return;
    }
    if (formData.duration <= 0) {
      setValidationError('Parking duration must be at least 1 hour.');
      return;
    }

    onAllocate(formData);
  };

  return (
    <div className="vehicle-form-card">
      <div className="card-header">
        <h3 className="card-title flex-center">
          <PlusCircle className="icon-title" size={20} />
          Vehicle Input & Allocation Form
        </h3>
        <p className="card-subtitle">Enter vehicle details to run Hill Climbing Heuristic Allocation</p>
      </div>

      {/* Preset Quick Select Buttons for Viva Demo */}
      <div className="preset-bar">
        <span className="preset-label flex-center">
          <Sparkles size={14} /> Sample Presets:
        </span>
        <div className="preset-buttons">
          {sampleVehicles.slice(0, 4).map(v => (
            <button
              key={v.id}
              type="button"
              className="btn-preset-chip"
              onClick={() => handleSelectPreset(v)}
            >
              {v.type} ({v.priority} Pri)
            </button>
          ))}
        </div>
      </div>

      {validationError && (
        <div className="form-alert-error flex-center">
          <AlertCircle size={18} />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Vehicle ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="e.g. V001"
              required
            />
          </div>

          <div className="form-group">
            <label>Vehicle Registration Number *</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. TN38AB1234"
              required
            />
          </div>

          <div className="form-group">
            <label>Vehicle Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority Level</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label>Parking Duration (Hours)</label>
            <input
              type="number"
              name="duration"
              min="1"
              max="24"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Target Destination</label>
            <select name="destination" value={formData.destination} onChange={handleChange}>
              <option value="Main Entrance">Main Entrance</option>
              <option value="Exit">Exit Gate</option>
              <option value="Lift">Elevator / Lift</option>
              <option value="Academic Block">Academic Block</option>
              <option value="Library">Library</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Preferred Location</label>
            <select name="preference" value={formData.preference} onChange={handleChange}>
              <option value="Near Entrance">Near Main Entrance</option>
              <option value="Near Exit">Near Exit Gate</option>
              <option value="Near Lift">Near Elevator / Lift</option>
              <option value="No Preference">No Specific Preference</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={isAllocating}
          >
            <Play size={20} className={isAllocating ? 'spin-anim' : ''} />
            <span>{isAllocating ? 'Running Hill Climbing Algorithm...' : 'Find Best Parking Space'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
