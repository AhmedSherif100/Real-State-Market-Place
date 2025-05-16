// All components mapping with path for internal routes

import { lazy } from 'react';

const Dashboard = lazy(() =>
  import('../../pages/admin-dashboard/protected/Dashboard')
);
const Welcome = lazy(() =>
  import('../../pages/admin-dashboard/protected/Welcome')
);
const Page404 = lazy(() => import('../../pages/admin-dashboard/protected/404'));
const Blank = lazy(() => import('../../pages/admin-dashboard/protected/Blank'));
const Charts = lazy(() =>
  import('../../pages/admin-dashboard/protected/Charts')
);
const Leads = lazy(() => import('../../pages/admin-dashboard/protected/Leads'));
const Integration = lazy(() =>
  import('../../pages/admin-dashboard/protected/Integration')
);
const Calendar = lazy(() =>
  import('../../pages/admin-dashboard/protected/Calendar')
);
const Team = lazy(() => import('../../pages/admin-dashboard/protected/Team'));
const Transactions = lazy(() =>
  import('../../pages/admin-dashboard/protected/Transactions')
);
const Bills = lazy(() => import('../../pages/admin-dashboard/protected/Bills'));
const ProfileSettings = lazy(() =>
  import('../../pages/admin-dashboard/protected/ProfileSettings')
);
const GettingStarted = lazy(() =>
  import('../../pages/admin-dashboard/GettingStarted')
);
const DocFeatures = lazy(() =>
  import('../../pages/admin-dashboard/DocFeatures')
);
const DocComponents = lazy(() =>
  import('../../pages/admin-dashboard/DocComponents')
);

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
];

export default routes;
