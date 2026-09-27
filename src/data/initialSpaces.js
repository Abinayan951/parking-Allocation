// 25 Parking spaces in a 5x5 grid (Rows A-E, Cols 1-5)
// Distances are measured in meters from key landmarks

export const initialSpaces = [
  // Row A (Near Main Entrance)
  {
    id: 'A01',
    row: 'A',
    column: 1,
    status: 'available', // 'available' | 'occupied' | 'reserved'
    allowedVehicleType: 'Car',
    distances: { entrance: 10, exit: 75, lift: 15, academicBlock: 50, library: 80 },
    assignedVehicle: null
  },
  {
    id: 'A02',
    row: 'A',
    column: 2,
    status: 'occupied',
    allowedVehicleType: 'Car',
    distances: { entrance: 12, exit: 70, lift: 18, academicBlock: 48, library: 78 },
    assignedVehicle: {
      id: 'V-DEMO-1',
      vehicleNumber: 'KA01AB1001',
      type: 'Car',
      priority: 'High',
      destination: 'Main Entrance'
    }
  },
  {
    id: 'A03',
    row: 'A',
    column: 3,
    status: 'available',
    allowedVehicleType: 'Bike',
    distances: { entrance: 15, exit: 65, lift: 22, academicBlock: 45, library: 75 },
    assignedVehicle: null
  },
  {
    id: 'A04',
    row: 'A',
    column: 4,
    status: 'available',
    allowedVehicleType: 'SUV',
    distances: { entrance: 18, exit: 60, lift: 25, academicBlock: 42, library: 72 },
    assignedVehicle: null
  },
  {
    id: 'A05',
    row: 'A',
    column: 5,
    status: 'reserved',
    allowedVehicleType: 'Car',
    distances: { entrance: 22, exit: 55, lift: 30, academicBlock: 40, library: 70 },
    assignedVehicle: null
  },

  // Row B (Near Lift & Academic Block)
  {
    id: 'B01',
    row: 'B',
    column: 1,
    status: 'available',
    allowedVehicleType: 'Bike',
    distances: { entrance: 25, exit: 60, lift: 10, academicBlock: 35, library: 65 },
    assignedVehicle: null
  },
  {
    id: 'B02',
    row: 'B',
    column: 2,
    status: 'occupied',
    allowedVehicleType: 'Car',
    distances: { entrance: 28, exit: 58, lift: 12, academicBlock: 32, library: 62 },
    assignedVehicle: {
      id: 'V-DEMO-2',
      vehicleNumber: 'TN38XY9988',
      type: 'Car',
      priority: 'Medium',
      destination: 'Academic Block'
    }
  },
  {
    id: 'B03',
    row: 'B',
    column: 3,
    status: 'available',
    allowedVehicleType: 'Any',
    distances: { entrance: 30, exit: 55, lift: 15, academicBlock: 30, library: 60 },
    assignedVehicle: null
  },
  {
    id: 'B04',
    row: 'B',
    column: 4,
    status: 'available',
    allowedVehicleType: 'SUV',
    distances: { entrance: 32, exit: 52, lift: 18, academicBlock: 28, library: 58 },
    assignedVehicle: null
  },
  {
    id: 'B05',
    row: 'B',
    column: 5,
    status: 'occupied',
    allowedVehicleType: 'Bike',
    distances: { entrance: 35, exit: 50, lift: 22, academicBlock: 25, library: 55 },
    assignedVehicle: {
      id: 'V-DEMO-3',
      vehicleNumber: 'MH12PQ4567',
      type: 'Bike',
      priority: 'Low',
      destination: 'Library'
    }
  },

  // Row C (Central Area)
  {
    id: 'C01',
    row: 'C',
    column: 1,
    status: 'available',
    allowedVehicleType: 'Car',
    distances: { entrance: 40, exit: 45, lift: 25, academicBlock: 25, library: 45 },
    assignedVehicle: null
  },
  {
    id: 'C02',
    row: 'C',
    column: 2,
    status: 'available',
    allowedVehicleType: 'Car',
    distances: { entrance: 42, exit: 42, lift: 28, academicBlock: 22, library: 42 },
    assignedVehicle: null
  },
  {
    id: 'C03',
    row: 'C',
    column: 3,
    status: 'occupied',
    allowedVehicleType: 'SUV',
    distances: { entrance: 45, exit: 40, lift: 30, academicBlock: 20, library: 40 },
    assignedVehicle: {
      id: 'V-DEMO-4',
      vehicleNumber: 'DL04CA1212',
      type: 'SUV',
      priority: 'High',
      destination: 'Academic Block'
    }
  },
  {
    id: 'C04',
    row: 'C',
    column: 4,
    status: 'available',
    allowedVehicleType: 'Bike',
    distances: { entrance: 48, exit: 38, lift: 32, academicBlock: 18, library: 38 },
    assignedVehicle: null
  },
  {
    id: 'C05',
    row: 'C',
    column: 5,
    status: 'reserved',
    allowedVehicleType: 'Car',
    distances: { entrance: 50, exit: 35, lift: 35, academicBlock: 15, library: 35 },
    assignedVehicle: null
  },

  // Row D (Near Library & Academic Block)
  {
    id: 'D01',
    row: 'D',
    column: 1,
    status: 'available',
    allowedVehicleType: 'Car',
    distances: { entrance: 55, exit: 30, lift: 38, academicBlock: 20, library: 25 },
    assignedVehicle: null
  },
  {
    id: 'D02',
    row: 'D',
    column: 2,
    status: 'occupied',
    allowedVehicleType: 'Bike',
    distances: { entrance: 58, exit: 28, lift: 40, academicBlock: 18, library: 22 },
    assignedVehicle: {
      id: 'V-DEMO-5',
      vehicleNumber: 'KL07BK3344',
      type: 'Bike',
      priority: 'Medium',
      destination: 'Library'
    }
  },
  {
    id: 'D03',
    row: 'D',
    column: 3,
    status: 'available',
    allowedVehicleType: 'Any',
    distances: { entrance: 60, exit: 25, lift: 42, academicBlock: 15, library: 20 },
    assignedVehicle: null
  },
  {
    id: 'D04',
    row: 'D',
    column: 4,
    status: 'available',
    allowedVehicleType: 'SUV',
    distances: { entrance: 62, exit: 22, lift: 45, academicBlock: 12, library: 18 },
    assignedVehicle: null
  },
  {
    id: 'D05',
    row: 'D',
    column: 5,
    status: 'available',
    allowedVehicleType: 'Car',
    distances: { entrance: 65, exit: 20, lift: 48, academicBlock: 10, library: 15 },
    assignedVehicle: null
  },

  // Row E (Near Exit Gate)
  {
    id: 'E01',
    row: 'E',
    column: 1,
    status: 'available',
    allowedVehicleType: 'Bike',
    distances: { entrance: 70, exit: 15, lift: 50, academicBlock: 30, library: 20 },
    assignedVehicle: null
  },
  {
    id: 'E02',
    row: 'E',
    column: 2,
    status: 'available',
    allowedVehicleType: 'Car',
    distances: { entrance: 72, exit: 12, lift: 52, academicBlock: 32, library: 18 },
    assignedVehicle: null
  },
  {
    id: 'E03',
    row: 'E',
    column: 3,
    status: 'occupied',
    allowedVehicleType: 'Car',
    distances: { entrance: 75, exit: 10, lift: 55, academicBlock: 35, library: 15 },
    assignedVehicle: {
      id: 'V-DEMO-6',
      vehicleNumber: 'TS09EX8877',
      type: 'Car',
      priority: 'Low',
      destination: 'Exit'
    }
  },
  {
    id: 'E04',
    row: 'E',
    column: 4,
    status: 'available',
    allowedVehicleType: 'SUV',
    distances: { entrance: 78, exit: 8, lift: 58, academicBlock: 38, library: 12 },
    assignedVehicle: null
  },
  {
    id: 'E05',
    row: 'E',
    column: 5,
    status: 'available',
    allowedVehicleType: 'Any',
    distances: { entrance: 80, exit: 5, lift: 60, academicBlock: 40, library: 10 },
    assignedVehicle: null
  }
];
