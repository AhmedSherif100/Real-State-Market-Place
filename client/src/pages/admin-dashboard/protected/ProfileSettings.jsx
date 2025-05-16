import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import ProfileSettings from '../../../features/admin-dashboard/settings/profilesettings';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Settings' }));
  }, []);

  return <ProfileSettings />;
}

export default InternalPage;
