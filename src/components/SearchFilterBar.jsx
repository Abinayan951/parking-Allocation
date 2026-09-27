import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter
}) {
  return (
    <div className="search-filter-card">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by Space ID (e.g. A01) or Vehicle No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <div className="filter-item">
          <Filter size={14} className="filter-icon" />
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Vehicle Type:</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="ALL">All Types</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="SUV">SUV</option>
            <option value="Any">Any</option>
          </select>
        </div>
      </div>
    </div>
  );
}
