/**
 * BLE Constants for MyHero device communication
 * Based on BLE_Integration_Guide.md
 */

// Custom UUID Base: xxxxxxxx-4D59-4842-8000-00805F9B34FB
// Where 4D59-4842 = "MYHB" (ASCII for "MyHero Board")

export const BLE_CONSTANTS = {
  // Device identification
  DEVICE_NAME: 'MyHero',

  // Auth Service
  AUTH_SERVICE_UUID: '00000001-4D59-4842-8000-00805F9B34FB',
  AUTH_KEY_WRITE_UUID: '00000101-4D59-4842-8000-00805F9B34FB', // Write 32-byte key
  AUTH_STATUS_UUID: '00000102-4D59-4842-8000-00805F9B34FB', // Read/Notify: 0x00=not auth, 0x01=auth
  AUTH_KEY_CLEAR_UUID: '00000103-4D59-4842-8000-00805F9B34FB', // Write any byte to clear (factory reset)

  // File Service
  FILE_SERVICE_UUID: '00000002-4D59-4842-8000-00805F9B34FB',
  FILE_LIST_UUID: '00000201-4D59-4842-8000-00805F9B34FB', // Read/Notify: [type:1][size:4][filename\0]
  FILE_DELETE_UUID: '00000202-4D59-4842-8000-00805F9B34FB', // Write: null-terminated filename
  TRANSFER_CONTROL_UUID: '00000203-4D59-4842-8000-00805F9B34FB', // Write/Notify: control commands
  TRANSFER_DATA_UUID: '00000204-4D59-4842-8000-00805F9B34FB', // Write/Notify: Base64 chunks
  TRANSFER_PROGRESS_UUID: '00000205-4D59-4842-8000-00805F9B34FB', // Read/Notify: [transferred:4][total:4]

  // Standard Battery Service
  BATTERY_SERVICE_UUID: '0000180F-0000-1000-8000-00805F9B34FB',
  BATTERY_LEVEL_UUID: '00002A19-0000-1000-8000-00805F9B34FB', // Read/Notify: uint8 0-100%

  // Transfer settings
  MAX_CHUNK_CHARS: 240, // Max Base64 characters per chunk
  MAX_CHUNK_BYTES: 180, // 240 * 3/4 = 180 bytes decoded
  AUTH_KEY_LENGTH: 32, // 32 bytes for authentication key

  // Timeouts
  SCAN_TIMEOUT_MS: 15000, // 15 seconds scan timeout
  CONNECTION_TIMEOUT_MS: 10000, // 10 seconds connection timeout

  // Transfer control opcodes
  TRANSFER_OP_CANCEL: 0x00,
  TRANSFER_OP_UPLOAD: 0x01,
  TRANSFER_OP_DOWNLOAD: 0x02,

  // Transfer status codes
  TRANSFER_STATUS_ERROR: 0x00,
  TRANSFER_STATUS_READY: 0x01,
  TRANSFER_STATUS_COMPLETE: 0x02,

  // File list entry types
  FILE_TYPE_FILE: 0x00,
  FILE_TYPE_DIRECTORY: 0x01,
  FILE_TYPE_END: 0xff,

  // Storage root path on device (internal - device auto-prefixes filenames)
  STORAGE_ROOT: '/Storage/',
};

// LocalStorage keys for BLE data persistence
export const BLE_STORAGE_KEYS = {
  PAIRED_DEVICES: 'ble_paired_devices', // Array of paired device info
  AUTH_KEYS: 'ble_auth_keys', // Map of deviceId -> hex auth key
};

export default BLE_CONSTANTS;
