import { createSlice } from "@reduxjs/toolkit";

const bleSlice = createSlice({
  name: "ble",
  initialState: {
    // Scanning state
    isScanning: false,
    discoveredDevices: [], // { id, name, rssi }[]

    // Connection state
    connectedDevice: null, // { id, name, batteryLevel }
    isConnecting: false,
    isAuthenticated: false,

    // Paired devices (persisted)
    pairedDevices: [], // { id, name, lastConnected }[]

    // File operations
    deviceFiles: [], // { name, size, type }[]
    isLoadingFiles: false,

    // Transfer state
    transferProgress: 0,
    transferType: null, // 'upload' | 'download' | null
    transferFileName: null,
  },
  reducers: {
    // Scanning
    setScanningState: (state, action) => {
      state.isScanning = action.payload;
    },
    addDiscoveredDevice: (state, action) => {
      const exists = state.discoveredDevices.find(d => d.id === action.payload.id);
      if (!exists) {
        state.discoveredDevices.push(action.payload);
      }
    },
    clearDiscoveredDevices: (state) => {
      state.discoveredDevices = [];
    },

    // Connection
    setConnectingState: (state, action) => {
      state.isConnecting = action.payload;
    },
    setConnectedDevice: (state, action) => {
      state.connectedDevice = action.payload;
      state.isConnecting = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    disconnectDevice: (state) => {
      state.connectedDevice = null;
      state.isAuthenticated = false;
      state.deviceFiles = [];
    },
    updateBatteryLevel: (state, action) => {
      if (state.connectedDevice) {
        state.connectedDevice.batteryLevel = action.payload;
      }
    },

    // Paired devices
    setPairedDevices: (state, action) => {
      state.pairedDevices = action.payload;
    },
    addPairedDevice: (state, action) => {
      const exists = state.pairedDevices.find(d => d.id === action.payload.id);
      if (!exists) {
        state.pairedDevices.push({
          ...action.payload,
          lastConnected: Date.now(),
        });
      } else {
        state.pairedDevices = state.pairedDevices.map(d =>
          d.id === action.payload.id ? { ...d, lastConnected: Date.now() } : d
        );
      }
    },
    removePairedDevice: (state, action) => {
      state.pairedDevices = state.pairedDevices.filter(d => d.id !== action.payload);
    },

    // Files
    setDeviceFiles: (state, action) => {
      state.deviceFiles = action.payload;
    },
    setLoadingFiles: (state, action) => {
      state.isLoadingFiles = action.payload;
    },
    removeDeviceFile: (state, action) => {
      state.deviceFiles = state.deviceFiles.filter(f => f.name !== action.payload);
    },

    // Transfer
    setTransferProgress: (state, action) => {
      state.transferProgress = action.payload.progress;
      state.transferType = action.payload.type;
      state.transferFileName = action.payload.fileName;
    },
    clearTransferState: (state) => {
      state.transferProgress = 0;
      state.transferType = null;
      state.transferFileName = null;
    },

    // Reset
    resetBLEState: (state) => {
      state.isScanning = false;
      state.discoveredDevices = [];
      state.connectedDevice = null;
      state.isConnecting = false;
      state.isAuthenticated = false;
      state.deviceFiles = [];
      state.transferProgress = 0;
      state.transferType = null;
      state.transferFileName = null;
      // Note: pairedDevices is NOT reset to preserve persistence
    },
  },
});

export const {
  setScanningState,
  addDiscoveredDevice,
  clearDiscoveredDevices,
  setConnectingState,
  setConnectedDevice,
  setAuthenticated,
  disconnectDevice,
  updateBatteryLevel,
  setPairedDevices,
  addPairedDevice,
  removePairedDevice,
  setDeviceFiles,
  setLoadingFiles,
  removeDeviceFile,
  setTransferProgress,
  clearTransferState,
  resetBLEState,
} = bleSlice.actions;

export default bleSlice.reducer;
