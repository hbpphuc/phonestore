import { Icon } from 'components'
import { publicRoutes, adminRoutes, privateRoutes } from 'routes/paths'

export const navigatorMenu = [
    {
        id: 1,
        path: publicRoutes.home,
        title: 'home',
    },
    {
        id: 2,
        path: publicRoutes.products,
        title: 'product',
    },
    {
        id: 3,
        path: publicRoutes.post,
        title: 'news',
    },
]

export const productAction = [
    { id: 1, title: 'Wishlist', icon: <Icon.FaHeart /> },
    { id: 2, title: 'Detail', icon: <Icon.BiDetail /> },
    { id: 3, title: 'Overview', icon: <Icon.FaEye /> },
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

export const productExtrainInfo = [
    {
        id: 1,
        title: 'Guarantee',
        subTitle: 'Quality Checked',
        icon: <Icon.FaShieldHalved />,
    },
    {
        id: 2,
        title: 'Free Shipping',
        subTitle: 'Free On All Products',
        icon: <Icon.BiSolidTruck />,
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        subTitle: 'Special Gift Cards',
        icon: <Icon.FaGift />,
    },
    {
        id: 4,
        title: 'Free Return',
        subTitle: 'Within 7 Days',
        icon: <Icon.GiReturnArrow />,
    },
    {
        id: 5,
        title: 'Consultancy',
        subTitle: 'Lifetime 24/7/356',
        icon: <Icon.TiPhone />,
    },
]

export const adminSidebarMenu = [
    {
        id: 1,
        title: 'Dashboard',
        type: 'link',
        icon: <Icon.RiDashboard2Line size={26} />,
        path: `/${adminRoutes.admin}/${adminRoutes.adminDashboard}`,
    },
    {
        id: 2,
        title: 'Manage Products',
        type: 'button',
        icon: <Icon.BiSolidDashboard size={24} />,
        path: `/${adminRoutes.admin}/${adminRoutes.adminProducts}`,
    },
    {
        id: 3,
        title: 'Manage Post',
        type: 'button',
        icon: <Icon.IoNewspaperOutline size={22} />,
        path: `/${adminRoutes.admin}/${adminRoutes.adminPosts}`,
    },
    {
        id: 4,
        title: 'Manage Users',
        type: 'link',
        icon: <Icon.HiUserGroup size={25} />,
        path: `/${adminRoutes.admin}/${adminRoutes.adminUsers}`,
    },
    {
        id: 5,
        title: 'Manage Orders',
        type: 'link',
        icon: <Icon.FaLayerGroup size={20} />,
        path: `/${adminRoutes.admin}/${adminRoutes.adminOrders}`,
    },
]

export const userSidebarMenu = [
    {
        id: 1,
        title: 'Account',
        icon: <Icon.IoPersonCircleSharp size={24} />,
        path: `${privateRoutes.account}`,
    },
    {
        id: 2,
        title: 'Wishlist',
        icon: <Icon.TfiLayoutListThumbAlt size={24} />,
        path: `${privateRoutes.wishlist}`,
    },
    {
        id: 3,
        title: 'Order',
        icon: <Icon.LiaMoneyBillWaveAltSolid size={24} />,
        path: `${privateRoutes.order}`,
    },
    {
        id: 4,
        title: 'Setting',
        icon: <Icon.AiFillSetting size={24} />,
        path: `${privateRoutes.setting}`,
    },
]

export const iconsCate = [
    {
        id: 'smartphone',
        icon: <Icon.LuSmartphone size={24} />,
    },
    {
        id: 'laptop',
        icon: <Icon.MdLaptopMac size={24} />,
    },
    {
        id: 'tablet',
        icon: <Icon.SlScreenTablet size={24} />,
    },
    {
        id: 'camera',
        icon: <Icon.RiCamera3Line size={24} />,
    },
    {
        id: 'television',
        icon: <Icon.FiMonitor size={24} />,
    },
    {
        id: 'speaker',
        icon: <Icon.BsSpeaker size={24} />,
    },
    {
        id: 'accessories',
        icon: <Icon.IoHeadset size={24} />,
    },
]
