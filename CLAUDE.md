# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UmboBooks/MyHero is a React Native mobile application for the "Umbo Connect" platform - a family/educational exchange platform with BLE-connected "MyHero" audio devices. Core features: user authentication, book library management, audio recording/playback, BLE device communication with file transfer, book exchanges, and family member management.

## Build & Run Commands

```bash
yarn install              # Install dependencies
yarn start                # Start Metro bundler
yarn android              # Build and run on Android
yarn ios                  # Build and run on iOS
yarn lint                 # Run ESLint
yarn test                 # Run Jest tests
yarn postinstall          # Downloads FFmpeg AAR for Android (runs automatically after install)
```

## Code Style

Prettier enforced — single quotes, no bracket spacing, trailing commas everywhere, no parens on single-param arrows. ESLint extends `@react-native` defaults.

Use `wp(percentage)` and `hp(percentage)` from `src/utility/UtilityMethods.js` for responsive sizing.

## Architecture

### Provider Hierarchy (App.jsx)

```
ToastProvider → Redux Provider → PersistGate → NavigationContainer → GestureHandlerRootView → PaperProvider → AUDIO_CONTEXT.Provider → RootStack
```

`navigationRef` is exported from App.jsx for programmatic navigation outside components.

### State Management: Redux Toolkit + Redux Persist

- **Store**: `src/redux/Store.js` (serializableCheck disabled)
- **Slices**:
  - `auth` (persisted): user, token, fcmToken, rememberMeCreds, totalNotification, routesDetail/Listing, recentSearches
  - `temp` (non-persisted): tempData, tempRouteName, changeColorMarker, tempChosenLocation, editableRoute
  - `ble` (partially persisted — only `pairedDevices`): scanning state, connection state, device files, transfer progress

### Navigation: React Navigation v6

- **Entry**: `src/navigation/RootStack.js` — routes to AuthStack or DashboardStack based on token
- **Routes**: `src/navigation/Routes.js` — all route name constants
- **Stacks**: AuthStack, DashboardStack, StudentStack (with BottomTab: Library/Home/Exchange), DrawerNavigater, FamilyMemberTopBar

### API Layer

- **Base URL**: `src/services/BaseUrl.js` (staging: hereapp-api-staging.ropstam.dev)
- **HTTP Client**: `src/services/AxiosWrapper.js`
  - Signature: `axiosWrapper(method, url, data, token, isFormData=false, responseType='json', showToast=false)`
  - Auto-injects Bearer token, handles multipart via `isFormData` flag
  - Auto-logout: dispatches `resetAuth()` on "Unauthorized" response
  - Toast notifications: only shown when `showToast=true`
- **Endpoints**: `src/services/apiPathList.js`

### BLE Device Communication

The app communicates with ESP32-based "MyHero" audio devices via BLE. See `BLE_Integration_Guide.md` for the full protocol spec.

- **Service**: `src/services/BLEService.js` (main BLE logic, ~1000 lines)
- **Constants**: `src/utility/BLEConstants.js` (UUIDs with custom base `xxxx-4D59-4842-8000-00805F9B34FB`)
- **State**: `src/redux/Reducers/BLEReducer.js`
- **UI**: `src/screens/Dashboard/ConnectWithDollScreen/`

**Key BLE concepts:**
- Single connection only; device stops advertising when connected
- App-level 32-byte key authentication (not BLE pairing)
- Auth keys stored in AsyncStorage via `src/utility/LocalStorage.js`
- File upload (phone→device): write-based, 490-byte raw binary chunks, MTU 512
- File download (device→phone): read-based with Ready notifications
- Screen stays awake during transfers (`react-native-keep-awake`)

### Audio System

- **Recording**: `react-native-audio-recorder-player` with pause/resume support
- **Format conversion**: FFmpeg converts to AAC (16kHz mono, 32kbps) for device compatibility
  - Command: `-y -i "${input}" -vn -c:a aac -b:a 32k -ar 16000 -ac 1 "${output}"`
- **Storage**: `${RNFS.ExternalStorageDirectoryPath}/Documents/UmboBooks/` (Android)
- **Context**: `AUDIO_CONTEXT` in App.jsx provides shared `audioFiles` state
- **Components**: `AudioRecordComponent` (recording), `AudioPlayComponent` (playback with seek)

## FFmpeg Configuration

FFmpeg AAR auto-downloads via Gradle task to `android/libs/`. If FFmpeg issues occur after `yarn install`, update `node_modules/ffmpeg-kit-react-native/android/build.gradle` at line 128. See `FFMPEG_ISSUE/` folder and README.md for the fix.

## Adding New Features

**New Screen**: Create in `src/screens/Dashboard/NewScreen/` → export from `src/screens/index.js` → add route to `Routes.js` → add `Stack.Screen` to appropriate stack

**New API Endpoint**: Add URL to `src/services/apiPathList.js` → call via `axiosWrapper()` with token and isFormData flags as needed

**New Component**: Create in `src/components/ComponentName/` → export from `src/components/index.js`

## Android Configuration

- **App ID**: `com.umbobooks`
- **Signing**: Debug uses default keystore; release uses `MYAPP_UPLOAD_*` properties from `gradle.properties`
- **FFmpeg**: Loaded from `android/libs/` via `flatDir` repository
- **ProGuard**: Disabled

## Environment

- Node: >=18, Yarn: 3.6.4, React Native: 0.74.4
- iOS: CocoaPods (`ios/UmboBooks.xcworkspace`)
- Android: Gradle with custom AAR download post-install

## Notable Unused Dependencies

`@realm/react` and `realm` are in package.json but not used anywhere in the codebase.
