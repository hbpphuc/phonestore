import { Default, Home, Product, Post, Login } from '../pages/public'
import routes from './routes'

export const defaultRoute = { path: routes.default, component: Default }

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.product,
        component: Product,
    },
    {
        path: routes.blog,
        component: Post,
    },
    {
        path: routes.login,
        component: Login,
    },
]

export const privateRoutes = []
