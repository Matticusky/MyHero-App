import {createSlice} from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    audioFiles: [],
  },
  reducers: {
    addAudioFile: (state, action) => {
      state.audioFiles.push(action.payload);
    },
    removeAudioFile: (state, action) => {
      state.audioFiles = state.audioFiles.filter(
        file => file._id !== action.payload,
      );
    },
  },
});

export const {addAudioFile, removeAudioFile} = audioSlice.actions;
export default audioSlice.reducer;
