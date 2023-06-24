import { Default, Home, Login } from '../pages/public';
import routes from './routes';

export const defaultRoute = { path: routes.default, component: Default };

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.login,
        component: Login,
    },
];

export const privateRoutes = [];
