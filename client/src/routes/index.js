import { Home, AllProduct, DetailProduct, Post, ResetPassword, NotFound } from '../pages/public'
import { routes } from './paths'

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.products,
        component: AllProduct,
    },
    {
        path: routes.product_category,
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
        path: routes.reset_password,
        component: ResetPassword,
    },
    {
        path: routes.notfound,
        component: NotFound,
    },
]

export const privateRoutes = []
