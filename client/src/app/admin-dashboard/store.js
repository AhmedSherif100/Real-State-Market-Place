import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../../features/admin-dashboard/common/headerSlice';
import modalSlice from '../../features/admin-dashboard/common/modalSlice';
import rightDrawerSlice from '../../features/admin-dashboard//common/rightDrawerSlice';
import leadsSlice from '../../features/admin-dashboard/leads/leadSlice';

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
