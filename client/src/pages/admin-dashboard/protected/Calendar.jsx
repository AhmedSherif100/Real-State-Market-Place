import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Calendar from '../../../features/admin-dashboard/calendar';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Calendar' }));
  }, []);

  return <Calendar />;
}

export default InternalPage;
