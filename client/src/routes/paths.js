export const publicRoutes = {
    home: '',
    products: '/products',
    product_category: '/products/:type',
    product_detail: '/products/:type/:slug',
    category: '/categories',
    blog: '/posts',
    signup: '/signup/:status',
    reset_password: '/reset-password/:token',
    notfound: '/not-found',
}

export const privateRoutes = {
    account: 'account',
    wishlist: 'wishlist',
    order: 'order',
    setting: 'setting',
}

export const adminRoutes = {
    admin: 'admin',
    adminLogin: 'login',
    adminDashboard: 'dashboard',
    adminProducts: 'products',
    adminUsers: 'users',
    adminOrders: 'orders',
}
