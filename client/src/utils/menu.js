import { Icon } from 'components'
import { publicRoutes } from 'routes/paths'

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
        path: publicRoutes.category,
        title: 'collection',
    },
    {
        id: 4,
        path: publicRoutes.blog,
        title: 'blog',
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

export const detailProductTabs = [
    [
        {
            id: 1,
            title: 'description',
        },
        {
            id: 2,
            title: 'warranty',
        },
        {
            id: 3,
            title: 'delivery',
        },
        {
            id: 4,
            title: 'payment',
        },
        {
            id: 5,
            title: 'customer review',
        },
    ],
    [
        {
            id: 1,
            subTitle: '',
            content: `There's no way you have missed the Xiaomi Redmi Note 3. It's been the bang-for-buck benchmark for a while now, delivering a feature set and performance way above what its price tag suggests.To refresh your memory Xiaomi launched the Redmi Note 3 at the turn of last year and it was powered by a MediaTek Helio X10. 
            In the spring of 2016, a Qualcomm-driven Redmi Note 3 followed and broke the company's sales record in India. Now this full review admittedly comes a little late, but the Xiaomi Redmi Note 3 is still on many people's radar, so we figured a way to compare the Mediatek-powered original and the Snapdragon edition might come in handy.  
            Besides the chipset, there's also a new camera sensor, a 16MP unit even if it is limited to 1080p video recording. Another difference is the second SIM card tray can now take microSD cards. It's the hybrid kind, which isn't ideal for people who want to have it all. Other than that, the hardware is perfectly familiar.`,
        },
        {
            id: 2,
            subTitle: 'warranty infomation',
            content: `LIMITED WARRANTIES
            Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

            Frames Used In Upholstered and Leather Products
            Limited Lifetime Warranty
            A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
        },
        {
            id: 3,
            subTitle: 'purchasing & delivery',
            content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
            Picking up at the store
            Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
            Delivery
            Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
            In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
        },
        {
            id: 4,
            subTitle: 'purchasing & delivery',
            content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
            Picking up at the store
            Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
            Delivery
            Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
            In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
        },
    ],
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
