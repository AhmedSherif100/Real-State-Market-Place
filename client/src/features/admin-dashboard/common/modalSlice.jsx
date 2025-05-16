import { createSlice, createAction } from '@reduxjs/toolkit';

// Modal size options for clarity
const MODAL_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Sample external action (replace with actual actions from your admin-dashboard)
const someExternalAction = createAction('someExternalAction');

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: '', // Modal title
    isOpen: false, // Modal open/closed state
    bodyType: '', // Modal content type
    size: MODAL_SIZES.MEDIUM, // Modal size (sm, md, lg)
    extraObject: {}, // Additional data for modal
  },
  reducers: {
    openModal: (state, action) => {
      const { title, bodyType, extraObject, size } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.size = size || MODAL_SIZES.MEDIUM;
      state.extraObject = extraObject || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.bodyType = '';
      state.title = '';
      state.size = MODAL_SIZES.MEDIUM;
      state.extraObject = {};
    },
  },
  extraReducers: (builder) => {
    // Example: Handle an external action (replace with actual actions)
    builder.addCase(someExternalAction, (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title || 'External Action';
      state.bodyType = action.payload.bodyType || 'default';
      state.size = action.payload.size || MODAL_SIZES.MEDIUM;
      state.extraObject = action.payload.extraObject || {};
    });
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
