import { publicRoutes, adminRoutes } from './paths'
import { Home, AllProduct, DetailProduct, Post, ResetPassword, NotFound } from '../pages/public'
import { Admin, Dashboard, ManageUsers, ManageProducts, ManageOrders } from 'pages/admin'

export const publicR = [
    {
        path: publicRoutes.home,
        component: Home,
    },
    {
        path: publicRoutes.products,
        component: AllProduct,
    },
    {
        path: publicRoutes.product_category,
        component: AllProduct,
    },
    {
        path: publicRoutes.product_detail,
        component: DetailProduct,
    },
    {
        path: publicRoutes.blog,
        component: Post,
    },
    {
        path: publicRoutes.reset_password,
        component: ResetPassword,
    },
    {
        path: publicRoutes.notfound,
        component: NotFound,
    },
]

export const privateR = []

export const adminR = [
    {
        path: adminRoutes.admin,
        component: Admin,
    },
    {
        path: adminRoutes.adminDashboard,
        component: Dashboard,
    },
    {
        path: adminRoutes.adminProducts,
        component: ManageProducts,
    },
    {
        path: adminRoutes.adminUsers,
        component: ManageUsers,
    },
    {
        path: adminRoutes.adminOrders,
        component: ManageOrders,
    },
]
