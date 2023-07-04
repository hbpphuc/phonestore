export const routes = {
    home: '',
    product: '/products',
    category: '/categories',
    blog: '/posts',
    signup: '/signup',
    login: '/login',

    notfound: '*',
}

export const childRoutes = {
    product_detail: ':type/:slug',
    notfound: '*',
}
