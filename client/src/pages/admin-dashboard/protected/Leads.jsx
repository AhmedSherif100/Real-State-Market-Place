import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Leads from '../../../features/admin-dashboard/leads';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Leads' }));
  }, []);

  return <Leads />;
}

export default InternalPage;
