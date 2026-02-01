# Mobile Application of Umbo Connect

### FFMPEG Issue
FFMPEG issues were fixed by following steps mentioned here: https://medium.com/@nooruddinlakhani/resolved-ffmpegkit-retirement-issue-in-react-native-a-complete-guide-0f54b113b390

A snapshot of page and said binary is included in the repository under `FFMPEG_ISSUE` folder.

Update build.gradle file located at `node_modules/ffmpeg-kit-react-native/android/build.gradle` as follows:

At line 128.
```diff
@@ -125,6 +125,6 @@
 implementation(name: 'ffmpeg-kit-full-gpl', ext: 'aar')
-   --- IGNORE ---
```