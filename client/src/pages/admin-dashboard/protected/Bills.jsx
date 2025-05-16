import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Billing from '../../../features/admin-dashboard/settings/billing';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Bills' }));
  }, []);

  return <Billing />;
}

export default InternalPage;
