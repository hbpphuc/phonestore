import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import DOMPurify from 'dompurify'
import 'react-tabs/style/react-tabs.css'
import * as apis from 'apis'
import { Breadcrumb, Icon, InfoProduct, ProductItem, Review, Section } from 'components'
import { productExtrainInfo } from 'utils/menu'

const DetailProduct = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    const { type, slug } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [others, setOthers] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [isMore, setIsMore] = useState(false)

    const settingsProducts = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    }

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true)
            const res = await apis.getProductBySlug({ slug })
            setIsLoading(false)
            if (res?.status === 'success') setProduct(res?.data?.data)
            else navigate('/not-found', { replace: true })
        }
        getProduct()
    }, [slug])

    useEffect(() => {
        const getAllProduct = async () => {
            setIsLoading(true)
            const res = await apis.getAllProduct()
            setIsLoading(false)
            if (res.status === 'success') {
                setOthers(res?.data?.data.filter((item) => item?.slug !== slug && item.category.slug === type))
            }
        }
        getAllProduct()
    }, [type, slug])

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                {deviceWidth >= 768 && (
                    <div className="w-full h-auto px-0 py-5 lg:mb-5 bg-[#f7f7f7] flex justify-center items-center">
                        <Breadcrumb />
                    </div>
                )}
                <div className="px-[10px] w-full xl:w-main h-auto mb-10 flex justify-center">
                    <div className="flex w-full lg:w-[75%] xl:w-[80%] lg:pr-5">
                        <InfoProduct data={product} detail isLoading={isLoading} />
                    </div>
                    <div className="flex-1 hidden lg:flex">
                        <ul className="w-full h-full">
                            {productExtrainInfo.map((item) => (
                                <li
                                    key={item.id}
                                    className="w-full h-[60px] flex gap-2 p-[10px] mb-[10px] leading-[6px] border border-[#ebebeb]"
                                >
                                    <span className="w-10 h-10 flex justify-center items-center rounded-full text-lg text-white bg-[#505050]">
                                        {item.icon}
                                    </span>
                                    <span className="flex-1 h-full flex flex-col justify-center gap-1">
                                        <h3 className="flex-1 h-[50%] flex items-center capitalize text-base text-primary">
                                            {item.title}
                                        </h3>
                                        <h3 className="flex-1 h-[50%] flex items-center capitalize text-sm text-[#999]">
                                            {item.subTitle}
                                        </h3>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full xl:w-main mb-4 md:mb-10 px-[10px]">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <span className="uppercase text-sm">description</span>
                            </Tab>
                            <Tab>
                                <span className="uppercase text-sm">reviews</span>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            {!isLoading ? (
                                <div
                                    className={`border border-[#aaa] border-t-0 p-5 relative ${
                                        !isMore && product?.description?.length > 0
                                            ? 'h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400] overflow-hidden'
                                            : ''
                                    }`}
                                >
                                    {product?.description?.length > 0 && (
                                        <div
                                            className="text-base"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(product?.description),
                                            }}
                                        ></div>
                                    )}
                                    {!isMore && product?.description?.length > 0 && (
                                        <div className="flex justify-center items-end absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff01] to-[#ffffffcc]">
                                            <div
                                                onClick={() => setIsMore(true)}
                                                className="mb-3 p-1 md:p-[8px_20px] flex flex-col items-center cursor-pointer text-primary hover:text-secondary transition-colors bg-glassmorphism"
                                            >
                                                <h1 className="text-lg md:text-3xl uppercase font-bold">see more</h1>
                                                <span>
                                                    <Icon.PiCaretDoubleDownBold size={24} />
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Skeleton />
                            )}
                        </TabPanel>
                        <TabPanel>
                            <Review />
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="w-full xl:w-main h-auto mb-5">
                    {others?.length > 0 ? (
                        <Section title="other products" pData={others} detail />
                    ) : (
                        <div className="w-full flex justify-center items-cente text-[#8b8b8b] text-xl">No product</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
