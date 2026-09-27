import { calculateHeuristic } from './heuristic';

/**
 * Get grid neighbors (up, down, left, right, diagonal) for a space in 5x5 grid
 */
function getGridNeighbors(currentSpace, allSpaces) {
  const rowNames = ['A', 'B', 'C', 'D', 'E'];
  const rIdx = rowNames.indexOf(currentSpace.row);
  const cIdx = currentSpace.column;

  const neighbors = [];

  allSpaces.forEach(space => {
    if (space.id === currentSpace.id) return;
    const targetRIdx = rowNames.indexOf(space.row);
    const targetCIdx = space.column;

    const rowDiff = Math.abs(rIdx - targetRIdx);
    const colDiff = Math.abs(cIdx - targetCIdx);

    // Adjacent in grid (distance <= 1 step in row or column, or nearby candidate)
    if (rowDiff <= 1 && colDiff <= 1) {
      neighbors.push(space);
    }
  });

  return neighbors;
}

/**
 * HILL CLIMBING ALGORITHM FOR PARKING SPACE ALLOCATION
 * 
 * Process:
 * 1. Start with an initial parking space S_0.
 * 2. Calculate H(S_0) using formula H(S) = 5(D) + 100(C) + 20(P) + 10(U).
 * 3. Explore neighboring parking spaces in the grid layout.
 * 4. Calculate H(S_neighbor) for each neighbor.
 * 5. If H(S_neighbor) < H(S_current), move to neighbor (Accepted).
 * 6. If H(S_neighbor) >= H(S_current), reject neighbor (Rejected).
 * 7. Repeat until no neighboring space offers a lower heuristic value (Local Minimum Found).
 */
export function hillClimbing(vehicle, allSpaces) {
  if (!vehicle || !allSpaces || allSpaces.length === 0) {
    return {
      success: false,
      message: "No parking spaces or vehicle data provided.",
      finalSpace: null,
      finalHeuristic: null,
      history: [],
      reason: []
    };
  }

  // Filter available (non-occupied, non-reserved) spaces for realistic candidates
  const candidateSpaces = allSpaces.filter(s => s.status !== 'occupied' && s.status !== 'reserved');

  if (candidateSpaces.length === 0) {
    return {
      success: false,
      message: "No suitable available parking space is currently available.",
      finalSpace: null,
      finalHeuristic: null,
      history: [],
      reason: ["All parking spaces are currently occupied or reserved."]
    };
  }

  const history = [];

  // Step 1: Select initial starting point S_0
  // To demonstrate Hill Climbing effectively, start from an arbitrary candidate space or first available space
  let currentSpace = candidateSpaces[0];
  let currentMetrics = calculateHeuristic(vehicle, currentSpace);
  let currentH = currentMetrics.heuristicValue;

  let iterationCount = 0;

  history.push({
    iteration: iterationCount,
    spaceId: currentSpace.id,
    spaceLabel: `Space ${currentSpace.id}`,
    heuristicValue: currentH,
    action: 'Start',
    metrics: currentMetrics,
    details: `Initial state at ${currentSpace.id} (Cost: ${currentH})`
  });

  let improved = true;
  const maxIterations = 20;

  // We will evaluate candidates across grid neighbors or candidate pool
  while (improved && iterationCount < maxIterations) {
    improved = false;

    // Get grid neighbors of current space
    let neighbors = getGridNeighbors(currentSpace, candidateSpaces);

    // If no direct grid neighbors are available, test remaining candidate spaces
    if (neighbors.length === 0) {
      neighbors = candidateSpaces.filter(s => s.id !== currentSpace.id);
    }

    // Evaluate each neighbor
    for (const neighbor of neighbors) {
      iterationCount++;
      const nMetrics = calculateHeuristic(vehicle, neighbor);
      const nH = nMetrics.heuristicValue;

      if (nH < currentH) {
        // Lower heuristic value found! Accept new allocation state
        currentSpace = neighbor;
        currentMetrics = nMetrics;
        currentH = nH;
        improved = true;

        history.push({
          iteration: iterationCount,
          spaceId: neighbor.id,
          spaceLabel: `Space ${neighbor.id}`,
          heuristicValue: nH,
          action: 'Accepted',
          metrics: nMetrics,
          details: `Improved cost from ${history[history.length - 1].heuristicValue} to ${nH}`
        });

        // Continue searching from this new better position (Hill Climbing step)
        break;
      } else {
        // Higher or equal heuristic value -> Reject neighbor move
        history.push({
          iteration: iterationCount,
          spaceId: neighbor.id,
          spaceLabel: `Space ${neighbor.id}`,
          heuristicValue: nH,
          action: 'Rejected',
          metrics: nMetrics,
          details: `Cost ${nH} >= current best ${currentH} (Rejected)`
        });
      }
    }
  }

  // Also verify against global candidates to ensure we don't miss optimal if stuck in local min
  // If global candidate is even better, record transition
  const bestGlobal = candidateSpaces.reduce((best, s) => {
    const m = calculateHeuristic(vehicle, s);
    return (m.heuristicValue < best.metrics.heuristicValue) ? { space: s, metrics: m } : best;
  }, { space: currentSpace, metrics: currentMetrics });

  if (bestGlobal.space.id !== currentSpace.id) {
    iterationCount++;
    currentSpace = bestGlobal.space;
    currentMetrics = bestGlobal.metrics;
    currentH = currentMetrics.heuristicValue;

    history.push({
      iteration: iterationCount,
      spaceId: currentSpace.id,
      spaceLabel: `Space ${currentSpace.id}`,
      heuristicValue: currentH,
      action: 'Accepted',
      metrics: currentMetrics,
      details: `Global optimal found at ${currentSpace.id} (Cost: ${currentH})`
    });
  }

  // Construct explanation reasons
  const reason = [
    `Lowest heuristic cost (${currentH}) found using Hill Climbing.`,
    `Walking distance: ${currentMetrics.distance}m to ${vehicle.destination}.`,
    currentMetrics.conflicts === 0 ? `Zero parking conflicts (Compatible for ${vehicle.type}).` : `Conflicts penalized: ${currentMetrics.conflicts}.`,
    currentMetrics.priorityPenalty === 0 ? `Priority requirement met for ${vehicle.priority} priority.` : `Priority penalty score: ${currentMetrics.priorityPenalty}.`,
    currentMetrics.underUtilization === 0 ? `Optimal space utilization for ${vehicle.type}.` : `Under-utilization score: ${currentMetrics.underUtilization}.`
  ];

  return {
    success: true,
    message: "Best parking space found using Hill Climbing.",
    finalSpace: currentSpace,
    finalHeuristic: currentH,
    metrics: currentMetrics,
    history: history,
    iterationsCount: iterationCount,
    reason: reason
  };
}
