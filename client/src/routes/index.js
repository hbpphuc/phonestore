import { Home, AllProduct, DetailProduct, Post, Login, NotFound } from '../pages/public'
import { routes } from './routes'

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.product,
        component: AllProduct,
    },
    {
        path: routes.product_detail,
        component: DetailProduct,
    },
    {
        path: routes.blog,
        component: Post,
    },
    {
        path: routes.login,
        component: Login,
    },
    {
        path: routes.notfound,
        component: NotFound,
    },
]

export const privateRoutes = []
