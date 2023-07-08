import { Home, AllProduct, DetailProduct, Post, NotFound } from '../pages/public'
import { routes } from './paths'

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
        path: routes.notfound,
        component: NotFound,
    },
]

export const privateRoutes = []
