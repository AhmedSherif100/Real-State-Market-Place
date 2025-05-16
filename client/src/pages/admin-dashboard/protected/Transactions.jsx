import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/admin-dashboard/common/headerSlice';
import Transactions from '../../../features/admin-dashboard/transactions';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Transactions' }));
  }, []);

  return <Transactions />;
}

export default InternalPage;
