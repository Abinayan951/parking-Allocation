import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import SearchFilterBar from './components/SearchFilterBar';
import ParkingGrid from './components/ParkingGrid';
import SpaceDetailModal from './components/SpaceDetailModal';
import VehicleForm from './components/VehicleForm';
import HeuristicPanel from './components/HeuristicPanel';
import HillClimbingTable from './components/HillClimbingTable';
import AllocationResultCard from './components/AllocationResultCard';
import AllocationHistory from './components/AllocationHistory';
import VivaGuideModal from './components/VivaGuideModal';
import ResetModal from './components/ResetModal';

import {
  getStoredSpaces,
  saveStoredSpaces,
  getStoredHistory,
  addAllocationToHistory,
  clearStoredHistory,
  resetLocalStorageToDefault
} from './utils/storage';
import { calculateHeuristic, calculateLotOverallHeuristic } from './utils/heuristic';
import { hillClimbing } from './utils/hillClimbing';

import './App.css';

export default function App() {
  const [spaces, setSpaces] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  
  // Selection & Allocation state
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [allocationResult, setAllocationResult] = useState(null);
  const [isAllocating, setIsAllocating] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Modals
  const [showVivaModal, setShowVivaModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Initial load
  useEffect(() => {
    const loadedSpaces = getStoredSpaces();
    setSpaces(loadedSpaces);
    const loadedHistory = getStoredHistory();
    setHistoryList(loadedHistory);
  }, []);

  // Filtered spaces for visual grid display
  const filteredSpaces = spaces.filter(space => {
    // Search query match (Space ID or assigned vehicle registration)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSpaceId = space.id.toLowerCase().includes(q);
      const matchVehicle = space.assignedVehicle && space.assignedVehicle.vehicleNumber
        ? space.assignedVehicle.vehicleNumber.toLowerCase().includes(q)
        : false;
      if (!matchSpaceId && !matchVehicle) return false;
    }

    // Status filter
    if (statusFilter !== 'ALL' && space.status !== statusFilter) {
      return false;
    }

    // Vehicle type filter
    if (typeFilter !== 'ALL' && space.allowedVehicleType !== 'Any' && space.allowedVehicleType !== typeFilter) {
      return false;
    }

    return true;
  });

  // Handle running Hill Climbing algorithm
  const handleRunAllocation = (vehicleData) => {
    setIsAllocating(true);
    setCurrentVehicle(vehicleData);

    // Simulate real algorithm execution step delay for smooth visual feedback
    setTimeout(() => {
      const result = hillClimbing(vehicleData, spaces);
      setAllocationResult(result);
      if (result.success && result.finalSpace) {
        setSelectedSpace(result.finalSpace);
      }
      setIsAllocating(false);
    }, 400);
  };

  // Confirm allocation and park vehicle in lot
  const handleConfirmAllocation = (vehicle, spaceToOccupy, result) => {
    const updatedSpaces = spaces.map(s => {
      if (s.id === spaceToOccupy.id) {
        return {
          ...s,
          status: 'occupied',
          assignedVehicle: vehicle
        };
      }
      return s;
    });

    setSpaces(updatedSpaces);
    saveStoredSpaces(updatedSpaces);

    // Log history
    const record = {
      timestamp: new Date().toLocaleString(),
      vehicleId: vehicle.id,
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.type,
      parkingSpaceId: spaceToOccupy.id,
      heuristicValue: result.finalHeuristic,
      status: 'Completed'
    };

    const newHistory = addAllocationToHistory(record);
    setHistoryList(newHistory);

    // Clear active result
    setAllocationResult(null);
    setCurrentVehicle(null);
    setSelectedSpace(null);
  };

  // Reset parking lot data
  const handleConfirmReset = () => {
    const freshSpaces = resetLocalStorageToDefault();
    setSpaces(freshSpaces);
    setAllocationResult(null);
    setCurrentVehicle(null);
    setSelectedSpace(null);
    setShowResetModal(false);
  };

  // Clear allocation history
  const handleClearHistory = () => {
    clearStoredHistory();
    setHistoryList([]);
  };

  // Select space for details modal
  const handleSelectSpace = (space) => {
    setSelectedSpace(space);
    setShowDetailModal(true);
  };

  // Compute metrics for Heuristic Panel
  const activeMetrics = allocationResult
    ? allocationResult.metrics
    : selectedSpace && currentVehicle
    ? calculateHeuristic(currentVehicle, selectedSpace)
    : null;

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        onOpenVivaModal={() => setShowVivaModal(true)}
        onOpenResetModal={() => setShowResetModal(true)}
      />

      {/* Main Content Container */}
      <main className="main-container">

        {/* 1. Dashboard Metrics Bar */}
        <section className="section-dashboard">
          <DashboardCards
            spaces={spaces}
            waitingCount={currentVehicle && !allocationResult ? 1 : 0}
            currentHeuristicCost={allocationResult ? allocationResult.finalHeuristic : null}
            isAllocating={isAllocating}
          />
        </section>

        {/* 2. Main Two-Column Layout (Form on Left, Grid on Right) */}
        <section className="section-main-grid">
          <div className="grid-left-column">
            <VehicleForm
              onAllocate={handleRunAllocation}
              isAllocating={isAllocating}
            />
          </div>

          <div className="grid-right-column">
            <SearchFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />

            <ParkingGrid
              spaces={filteredSpaces}
              selectedSpaceId={selectedSpace?.id}
              recommendedSpaceId={allocationResult?.finalSpace?.id}
              onSelectSpace={handleSelectSpace}
            />
          </div>
        </section>

        {/* 3. Hill Climbing Allocation Result Summary (if generated) */}
        {allocationResult && (
          <section className="section-result">
            <AllocationResultCard
              allocationResult={allocationResult}
              vehicle={currentVehicle}
              onConfirmAllocation={handleConfirmAllocation}
            />
          </section>
        )}

        {/* 4. Heuristic Calculation Panel */}
        <section className="section-heuristic">
          <HeuristicPanel
            metrics={activeMetrics}
            selectedSpace={selectedSpace || allocationResult?.finalSpace}
            currentVehicle={currentVehicle}
          />
        </section>

        {/* 5. Hill Climbing Iteration Log */}
        <section className="section-hill-climbing">
          <HillClimbingTable
            history={allocationResult?.history}
            finalHeuristic={allocationResult?.finalHeuristic}
            finalSpace={allocationResult?.finalSpace}
          />
        </section>

        {/* 6. Allocation History */}
        <section className="section-history">
          <AllocationHistory
            historyList={historyList}
            onClearHistory={handleClearHistory}
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>SmartPark — Heuristic Parking Space Allocation System | MCA Practical Demonstration</p>
      </footer>

      {/* Modals */}
      {showDetailModal && (
        <SpaceDetailModal
          space={selectedSpace}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showVivaModal && (
        <VivaGuideModal
          onClose={() => setShowVivaModal(false)}
        />
      )}

      {showResetModal && (
        <ResetModal
          onConfirm={handleConfirmReset}
          onClose={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}
