/**
 * HEURISTIC FUNCTION FOR PARKING SPACE ALLOCATION
 * MCA Practical Assignment Formula:
 * H(S) = 5(D) + 100(C) + 20(P) + 10(U)
 * 
 * Where:
 * D = Walking distance (in meters) to target destination
 * C = Number of parking conflicts (Occupied space, Incompatible vehicle type)
 * P = Priority penalty (High priority assigned to non-preferred or distant space)
 * U = Space under-utilization penalty (e.g., small vehicle in oversized spot)
 * 
 * Goal: Minimization problem (Lower H(S) = Better allocation quality)
 */

export function getDestinationDistance(space, destination) {
  if (!space || !space.distances) return 100;
  
  switch (destination) {
    case 'Main Entrance':
      return space.distances.entrance ?? 50;
    case 'Exit':
      return space.distances.exit ?? 50;
    case 'Lift':
      return space.distances.lift ?? 50;
    case 'Academic Block':
      return space.distances.academicBlock ?? 50;
    case 'Library':
      return space.distances.library ?? 50;
    default:
      return space.distances.entrance ?? 50;
  }
}

export function calculateHeuristic(vehicle, space) {
  if (!vehicle || !space) {
    return {
      distance: 999,
      conflicts: 1,
      priorityPenalty: 1,
      underUtilization: 1,
      heuristicValue: 9999,
      breakdown: "Invalid vehicle or space"
    };
  }

  // 1. Walking Distance (D)
  const D = getDestinationDistance(space, vehicle.destination);

  // 2. Parking Conflicts (C)
  let C = 0;
  
  // Conflict if space is already occupied
  if (space.status === 'occupied') {
    C += 1;
  }

  // Conflict if space is reserved
  if (space.status === 'reserved') {
    C += 1;
  }

  // Vehicle type compatibility conflict
  if (space.allowedVehicleType !== 'Any' && space.allowedVehicleType !== vehicle.type) {
    // If vehicle is SUV and space is for Bike or Car, that's a hard conflict
    if (vehicle.type === 'SUV' && space.allowedVehicleType !== 'SUV') {
      C += 1;
    }
    // If space is strictly for Bike and vehicle is Car/SUV
    else if (space.allowedVehicleType === 'Bike' && vehicle.type !== 'Bike') {
      C += 1;
    }
    // If space is strictly for Car and vehicle is Bike or SUV
    else if (space.allowedVehicleType === 'Car' && vehicle.type !== 'Car') {
      C += 1;
    }
  }

  // 3. Priority Penalty (P)
  let P = 0;
  if (vehicle.priority === 'High') {
    // High priority needs close proximity (< 25m) or matched preference
    if (D > 30) P += 1;
    if (vehicle.preference === 'Near Entrance' && space.distances.entrance > 25) P += 1;
    if (vehicle.preference === 'Near Exit' && space.distances.exit > 25) P += 1;
    if (vehicle.preference === 'Near Lift' && space.distances.lift > 25) P += 1;
  } else if (vehicle.priority === 'Medium') {
    if (D > 45) P += 1;
  } else {
    // Low priority
    P = 0;
  }

  // 4. Space Under-Utilization (U)
  let U = 0;
  if (vehicle.type === 'Bike' && space.allowedVehicleType === 'SUV') {
    // Bike occupying SUV space wastes large spot
    U = 2;
  } else if (vehicle.type === 'Car' && space.allowedVehicleType === 'SUV') {
    U = 1;
  } else if (vehicle.type === 'Bike' && space.allowedVehicleType === 'Car') {
    U = 1;
  }

  // Formula: H(S) = 5(D) + 100(C) + 20(P) + 10(U)
  const heuristicValue = (5 * D) + (100 * C) + (20 * P) + (10 * U);

  const breakdown = `5(${D}) + 100(${C}) + 20(${P}) + 10(${U})`;

  return {
    distance: D,
    conflicts: C,
    priorityPenalty: P,
    underUtilization: U,
    heuristicValue: heuristicValue,
    breakdown: breakdown,
    formula: `H(S) = ${heuristicValue}`
  };
}

/**
 * Calculates overall heuristic score for the entire parking lot layout
 */
export function calculateLotOverallHeuristic(spaces) {
  let totalDistance = 0;
  let totalConflicts = 0;
  let totalPriorityPenalty = 0;
  let totalUnderUtilization = 0;

  spaces.forEach(space => {
    if (space.assignedVehicle) {
      const metrics = calculateHeuristic(space.assignedVehicle, space);
      totalDistance += metrics.distance;
      totalConflicts += metrics.conflicts;
      totalPriorityPenalty += metrics.priorityPenalty;
      totalUnderUtilization += metrics.underUtilization;
    }
  });

  const totalH = (5 * totalDistance) + (100 * totalConflicts) + (20 * totalPriorityPenalty) + (10 * totalUnderUtilization);
  return {
    totalDistance,
    totalConflicts,
    totalPriorityPenalty,
    totalUnderUtilization,
    totalH
  };
}
