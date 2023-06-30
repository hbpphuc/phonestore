import { Icon } from '../components'

export const navigatorMenu = [
    {
        id: 1,
        path: '',
        title: 'home',
    },
    {
        id: 2,
        path: '/products',
        title: 'product',
    },
    {
        id: 3,
        path: '/categories',
        title: 'collection',
    },
    {
        id: 4,
        path: '/posts',
        title: 'blog',
    },
]

export const productAction = [
    { id: 1, title: 'Wishlist', icon: <Icon.FaHeart /> },
    { id: 2, title: 'Detail', icon: <Icon.HiMenu /> },
    { id: 3, title: 'Quick View', icon: <Icon.FaEye /> },
]

export const footerMenu = [
    {
        title: 'who we are',
        items: ['Typography', 'Gallery', 'Store Location', "Today's Deals", "Today's Choice"],
    },
    {
        title: 'infomation',
        items: ['Help', 'Free Shipping', 'FAQs', 'Return & Exchange', 'Testimonials'],
    },
    {
        title: 'my account',
        items: ['Wishlist', 'Blog', 'My account', 'About Us', 'Sitemap'],
    },
]
