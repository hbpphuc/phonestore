import { publicRoutes, adminRoutes, privateRoutes } from './paths'
import { Home, AllProduct, DetailProduct, Post, ResetPassword, NotFound, DetailPost } from '../pages/public'
import { Admin, Dashboard, ManageUsers, ManageProducts, ManageOrders, ManagePosts } from '../pages/admin'
import { UserAccount, UserOrder, UserSetting, UserWishlist } from '../pages/private'

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
        path: publicRoutes.post,
        component: Post,
    },
    {
        path: publicRoutes.post_type,
        component: Post,
    },
    {
        path: publicRoutes.post_detail,
        component: DetailPost,
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

export const privateR = [
    {
        path: privateRoutes.account,
        component: UserAccount,
    },
    {
        path: privateRoutes.wishlist,
        component: UserWishlist,
    },
    {
        path: privateRoutes.order,
        component: UserOrder,
    },
    {
        path: privateRoutes.setting,
        component: UserSetting,
    },
]

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
        path: adminRoutes.adminPosts,
        component: ManagePosts,
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
