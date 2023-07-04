import { Home, AllProduct, DetailProduct, Post, Login, NotFound } from '../pages/public'
import { routes, childRoutes } from './routes'

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.product,
        component: AllProduct,
        child: [
            {
                path: childRoutes.product_detail,
                component: DetailProduct,
            },
        ],
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
