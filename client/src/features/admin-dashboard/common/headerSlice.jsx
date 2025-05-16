import { createSlice, createAction } from '@reduxjs/toolkit';

// Notification status types for clarity
const NOTIFICATION_STATUS = {
  SUCCESS: 1,
  ERROR: 2,
  INFO: 3,
};

// Sample external action (replace with actual actions from your admin-dashboard)
const someExternalAction = createAction('someExternalAction');

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    pageTitle: 'Home', // Current page title
    noOfNotifications: 15, // Number of unread notifications
    newNotificationMessage: '', // Notification message to display
    newNotificationStatus: NOTIFICATION_STATUS.SUCCESS, // Notification type (success/error/info)
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },
    removeNotificationMessage: (state) => {
      state.newNotificationMessage = '';
    },
    showNotification: (state, action) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    // Example: Handle an external action (replace with actual actions)
    builder.addCase(someExternalAction, (state, action) => {
      state.newNotificationMessage =
        action.payload.message || 'Action triggered';
      state.newNotificationStatus = NOTIFICATION_STATUS.INFO;
    });
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;
