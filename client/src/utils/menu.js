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
        path: '/posts',
        title: 'blog',
    },
    {
        id: 4,
        path: '/categories',
        title: 'category',
    },
]

export const productAction = [
    {
        title: 'Wishlist',
        icon: <Icon.FaHeart />,
    },
    {
        title: 'Detail',
        icon: <Icon.HiMenu />,
    },
    {
        title: 'Quick View',
        icon: <Icon.FaEye />,
    },
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
