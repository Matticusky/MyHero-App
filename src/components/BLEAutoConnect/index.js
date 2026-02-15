import {useEffect, useRef, useCallback} from 'react';
import {AppState} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BLEService from '../../services/BLEService';
import AlertService from '../../services/AlertService';
import {BLE_CONSTANTS} from '../../utility/BLEConstants';
import {
  setConnectedDevice,
  setAuthenticated,
  addPairedDevice,
} from '../../redux/Reducers/BLEReducer';

const BLEAutoConnect = () => {
  const dispatch = useDispatch();
  const {pairedDevices, connectedDevice, isConnecting} = useSelector(
    state => state.ble,
  );

  const appStateRef = useRef(AppState.currentState);
  const isAutoConnectingRef = useRef(false);
  const scanIntervalRef = useRef(null);

  // Stable refs for values used inside callbacks
  const connectedDeviceRef = useRef(connectedDevice);
  const isConnectingRef = useRef(isConnecting);
  const pairedDevicesRef = useRef(pairedDevices);

  useEffect(() => {
    connectedDeviceRef.current = connectedDevice;
  }, [connectedDevice]);

  useEffect(() => {
    isConnectingRef.current = isConnecting;
  }, [isConnecting]);

  useEffect(() => {
    pairedDevicesRef.current = pairedDevices;
  }, [pairedDevices]);

  const attemptAutoConnect = useCallback(async () => {
    // Prevent conflicts with manual connects or concurrent auto-connects
    if (
      isAutoConnectingRef.current ||
      isConnectingRef.current ||
      connectedDeviceRef.current
    ) {
      return;
    }

    const devices = pairedDevicesRef.current;
    if (!devices || devices.length === 0) {
      return;
    }

    isAutoConnectingRef.current = true;

    try {
      const hasPermission = await BLEService.requestPermissions();
      if (!hasPermission) {
        return;
      }

      const btState = await BLEService.manager.state();
      if (btState !== 'PoweredOn') {
        return;
      }

      // Scan and collect paired devices that are in range
      const foundDevices = new Map();

      await new Promise(resolve => {
        BLEService.startScan(
          device => {
            const isPaired = devices.some(pd => pd.id === device.id);
            if (isPaired && !foundDevices.has(device.id)) {
              foundDevices.set(device.id, device);
            }
          },
          () => resolve(),
          error => {
            console.log('Auto-connect scan error:', error);
            resolve();
          },
        );
      });

      // Connect to first found paired device (if still disconnected)
      if (foundDevices.size > 0 && !connectedDeviceRef.current) {
        const deviceToConnect = Array.from(foundDevices.values())[0];

        try {
          await BLEService.connectToDevice(deviceToConnect.id);
          await BLEService.authenticate(deviceToConnect.id);
          const batteryLevel = await BLEService.getBatteryLevel();

          dispatch(
            setConnectedDevice({
              id: deviceToConnect.id,
              name: deviceToConnect.name,
              batteryLevel,
            }),
          );
          dispatch(setAuthenticated(true));
          dispatch(addPairedDevice(deviceToConnect));

          AlertService.toastPrompt('Device connected');
        } catch (error) {
          console.log('Auto-connect failed:', error.message || error);
          // Silent failure — not user-initiated
        }
      }
    } catch (error) {
      console.log('Auto-connect error:', error.message || error);
    } finally {
      isAutoConnectingRef.current = false;
    }
  }, [dispatch]);

  const startPeriodicScan = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = setInterval(() => {
      if (
        !connectedDeviceRef.current &&
        !isConnectingRef.current &&
        !isAutoConnectingRef.current
      ) {
        attemptAutoConnect();
      }
    }, BLE_CONSTANTS.AUTO_CONNECT_RETRY_MS);
  }, [attemptAutoConnect]);

  const stopPeriodicScan = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  // Initial auto-connect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      attemptAutoConnect();
      startPeriodicScan();
    }, BLE_CONSTANTS.AUTO_CONNECT_INITIAL_DELAY_MS);

    return () => {
      clearTimeout(timer);
      stopPeriodicScan();
    };
  }, [attemptAutoConnect, startPeriodicScan, stopPeriodicScan]);

  // Stop/start periodic scan based on connection state
  useEffect(() => {
    if (connectedDevice) {
      stopPeriodicScan();
    } else if (pairedDevices.length > 0) {
      startPeriodicScan();
    }
  }, [connectedDevice, pairedDevices, startPeriodicScan, stopPeriodicScan]);

  // AppState listener — reconnect when app returns to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App foregrounded — attempting auto-connect');
        attemptAutoConnect();
      }
      appStateRef.current = nextAppState;
    });

    return () => subscription?.remove();
  }, [attemptAutoConnect]);

  return null;
};

export default BLEAutoConnect;
