# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UmboBooks/MyHero is a React Native mobile application for the "Umbo Connect" platform - a family/educational exchange platform with features including user authentication, book library management, audio recording/playback, book exchanges, and family member management.

## Build & Run Commands

```bash
# Install dependencies
yarn install

# Start Metro bundler
yarn start

# Build and run
yarn android          # Android
yarn ios              # iOS

# Code quality
yarn lint             # Run ESLint

# Testing
yarn test             # Run Jest tests

# Post-install (downloads FFmpeg AAR for Android)
yarn postinstall
```

## Architecture

### State Management: Redux Toolkit + Redux Persist
- **Store**: `src/redux/Store.js`
- **Slices**:
  - `auth` (persisted): user, token, FCM token, notifications
  - `temp` (non-persisted): temporary data
- Uses AsyncStorage for persistence

### Navigation: React Navigation v6
- **Entry**: `src/navigation/RootStack.js` - routes to AuthStack or DashboardStack based on token
- **Routes**: `src/navigation/Routes.js` - all route name constants
- **Stacks**:
  - `AuthStack.js` - login, signup, OTP, password flows
  - `DashboardStack.js` - post-login container
  - `StudentStack.js` - main app with BottomTab navigation
  - `BottomTab.js` - Library, Home, Exchange tabs

### API Layer
- **Base URL**: `src/services/BaseUrl.js` (staging: hereapp-api-staging.ropstam.dev)
- **HTTP Client**: `src/services/AxiosWrapper.js` - Axios wrapper with auth interceptors, multipart support, auto-logout on 401
- **Endpoints**: `src/services/apiPathList.js`

### Audio Context
- Global audio state provided via `AUDIO_CONTEXT` in `App.jsx`
- FFmpeg via ffmpeg-kit-react-native for audio processing

## Key Directories

```
src/
├── assets/          # Colors, fonts, icons, images, audio, video
├── components/      # 50+ reusable components
├── screens/         # Organized by flow (Auth/, Dashboard/)
├── navigation/      # React Navigation config
├── redux/           # Store and reducers
├── services/        # API wrapper, endpoints, alerts
└── utility/         # Helpers, validators, responsive sizing
```

## Responsive Design

Use utility functions from `src/utility/UtilityMethods.js`:
- `wp(percentage)` - width percentage
- `hp(percentage)` - height percentage

## FFmpeg Configuration

FFmpeg requires special setup. The binary `ffmpeg-kit-full-gpl.aar` is included in the repository root. See `FFMPEG_ISSUE/` folder and README.md for troubleshooting.

If FFmpeg issues occur, update `node_modules/ffmpeg-kit-react-native/android/build.gradle` at line 128 per the Medium article linked in README.md.

## Adding New Features

**New Screen**:
1. Create in `src/screens/Dashboard/NewScreen/`
2. Export from `src/screens/index.js`
3. Add route to `src/navigation/Routes.js`
4. Add Stack.Screen to appropriate stack

**New API Endpoint**:
1. Add URL to `src/services/apiPathList.js`
2. Call via `axiosWrapper()` with token and isFormData flags as needed

**New Component**:
1. Create in `src/components/ComponentName/`
2. Export from `src/components/index.js`

## Environment

- Node: >=18
- Yarn: 3.6.4
- React Native: 0.74.4
- iOS: Uses CocoaPods (`ios/UmboBooks.xcworkspace`)
- Android: Uses Gradle with custom AAR download post-install
