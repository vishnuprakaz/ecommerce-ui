import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project import
import Loadable from 'ui-component/Loadable';

// Commented out for E-commerce AI Agent POC - redirecting to e-commerce instead
// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Navigate to="/apps/e-commerce/products" replace />
        // Changed for E-commerce AI Agent POC - redirect to products instead of landing
        // element: <PagesLanding /> 
    }, 
    AuthenticationRoutes, 
    LoginRoutes, 
    MainRoutes
], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
