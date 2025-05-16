import { createSlice, createAction } from '@reduxjs/toolkit';

// Sample external action (replace with actual actions from your admin-dashboard)
const someExternalAction = createAction('someExternalAction');

export const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState: {
    header: '', // Drawer header
    isOpen: false, // Drawer open/closed state
    bodyType: '', // Drawer content type
    extraObject: {}, // Additional data for drawer
  },
  reducers: {
    openRightDrawer: (state, action) => {
      const { header, bodyType, extraObject } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.header = header;
      state.extraObject = extraObject || {};
    },
    closeRightDrawer: (state) => {
      state.isOpen = false;
      state.bodyType = '';
      state.header = '';
      state.extraObject = {};
    },
  },
  extraReducers: (builder) => {
    // Example: Handle an external action (replace with actual actions)
    builder.addCase(someExternalAction, (state, action) => {
      state.isOpen = true;
      state.header = action.payload.header || 'External Action';
      state.bodyType = action.payload.bodyType || 'default';
      state.extraObject = action.payload.extraObject || {};
    });
  },
});

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
