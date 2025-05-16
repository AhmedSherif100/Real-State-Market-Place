import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Integration from '../../../features/admin-dashboard/integration';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Integrations' }));
  }, []);

  return <Integration />;
}

export default InternalPage;
