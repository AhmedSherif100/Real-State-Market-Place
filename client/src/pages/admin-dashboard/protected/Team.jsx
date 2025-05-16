import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Team from '../../../features/admin-dashboard/settings/team';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Team Members' }));
  }, []);

  return <Team />;
}

export default InternalPage;
