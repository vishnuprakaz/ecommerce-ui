import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { loader as productsLoader, productLoader } from 'api/products';

// DISABLED FOR E-COMMERCE AI AGENT POC - KEEPING ONLY CORE E-COMMERCE
// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

// widget routing
// const WidgetStatistics = Loadable(lazy(() => import('views/widget/Statistics')));
// const WidgetData = Loadable(lazy(() => import('views/widget/Data')));
// const WidgetChart = Loadable(lazy(() => import('views/widget/Chart')));

// application - user social & account profile routing
// const AppUserSocialProfile = Loadable(lazy(() => import('views/application/users/social-profile')));
// const AppUserAccountProfile1 = Loadable(lazy(() => import('views/application/users/account-profile/Profile1')));
// const AppUserAccountProfile2 = Loadable(lazy(() => import('views/application/users/account-profile/Profile2')));
// const AppUserAccountProfile3 = Loadable(lazy(() => import('views/application/users/account-profile/Profile3')));

// application - user cards & list variant routing
// const AppProfileCardStyle1 = Loadable(lazy(() => import('views/application/users/card/CardStyle1')));
// const AppProfileCardStyle2 = Loadable(lazy(() => import('views/application/users/card/CardStyle2')));
// const AppProfileCardStyle3 = Loadable(lazy(() => import('views/application/users/card/CardStyle3')));
// const AppProfileListStyle1 = Loadable(lazy(() => import('views/application/users/list/Style1')));
// const AppProfileListStyle2 = Loadable(lazy(() => import('views/application/users/list/Style2')));

// application - customer routing
// const AppCustomerList = Loadable(lazy(() => import('views/application/customer/CustomerList')));
// const AppCustomerOrderList = Loadable(lazy(() => import('views/application/customer/OrderList')));
// const AppCustomerCreateInvoice = Loadable(lazy(() => import('views/application/customer/CreateInvoice')));
// const AppCustomerOrderDetails = Loadable(lazy(() => import('views/application/customer/OrderDetails')));
// const AppCustomerProduct = Loadable(lazy(() => import('views/application/customer/Product')));
// const AppCustomerProductReview = Loadable(lazy(() => import('views/application/customer/ProductReview')));

// application - chat / kanban / kanban / mail / calendar / contact routing
// const AppChat = Loadable(lazy(() => import('views/application/chat')));
// const AppKanban = Loadable(lazy(() => import('views/application/kanban')));
// const AppKanbanBacklogs = Loadable(lazy(() => import('views/application/kanban/Backlogs')));
// const AppKanbanBoard = Loadable(lazy(() => import('views/application/kanban/Board')));
// const AppMail = Loadable(lazy(() => import('views/application/mail')));
// const AppCalendar = Loadable(lazy(() => import('views/application/calendar')));
// const AppContactCard = Loadable(lazy(() => import('views/application/contact/Card')));
// const AppContactList = Loadable(lazy(() => import('views/application/contact/List')));

// application - e-commerce routing - KEEPING CORE E-COMMERCE + CART
const AppECommProducts = Loadable(lazy(() => import('views/application/e-commerce/Products')));
const AppECommProductDetails = Loadable(lazy(() => import('views/application/e-commerce/ProductDetails')));
const AppECommCheckout = Loadable(lazy(() => import('views/application/e-commerce/Checkout')));
// const AppECommProductList = Loadable(lazy(() => import('views/application/e-commerce/ProductList')));

// DISABLED FOR E-COMMERCE AI AGENT POC - ALL OTHER IMPORTS COMMENTED OUT
// application - invoice routing
// const AppInvoiceDashboard = Loadable(lazy(() => import('views/application/invoice/Dashboard')));
// ... (all other imports commented out)

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        // DISABLED FOR E-COMMERCE AI AGENT POC - WIDGET ROUTES
        // {
        //     path: '/widget/statistics',
        //     element: <WidgetStatistics />
        // },
        // {
        //     path: '/widget/data',
        //     element: <WidgetData />
        // },
        // {
        //     path: '/widget/chart',
        //     element: <WidgetChart />
        // },

        // DISABLED FOR E-COMMERCE AI AGENT POC - ALL OTHER ROUTES COMMENTED OUT
        // ... (all other routes)

        // KEEPING E-COMMERCE PRODUCT + CART ROUTES
        {
            path: '/apps/e-commerce/products',
            element: <AppECommProducts />,
            loader: productsLoader,
            errorElement: <ErrorBoundary />
        },
        {
            path: '/apps/e-commerce/product-details/:id',
            element: <AppECommProductDetails />,
            loader: productLoader,
            errorElement: <ErrorBoundary />
        },
        {
            path: '/apps/e-commerce/checkout',
            element: <AppECommCheckout />
        }

        // DISABLED FOR E-COMMERCE AI AGENT POC - ALL OTHER ROUTES COMMENTED OUT
        // {
        //     path: '/apps/e-commerce/product-list',
        //     element: <AppECommProductList />,
        //     loader: productsLoader,
        //     errorElement: <ErrorBoundary />
        // },
        // {
        //     path: '/dashboard/default',
        //     element: <DashboardDefault />
        // },
        // {
        //     path: '/dashboard/analytics',
        //     element: <DashboardAnalytics />
        // }
        // ... (all other routes commented out)
    ]
};

export default MainRoutes;
