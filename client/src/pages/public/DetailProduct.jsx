import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import Skeleton from 'react-loading-skeleton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import DOMPurify from 'dompurify'
import 'react-tabs/style/react-tabs.css'
import * as apis from 'apis'
import { Breadcrumb, Icon, InfoProduct, ProductItem, Review } from 'components'
import { detailProductTabs, productExtrainInfo } from 'utils/menu'

const DetailProduct = () => {
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
                <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb />
                </div>
                <div className="w-main h-auto mb-10 flex justify-center">
                    <div className="w-[80%] pr-5">
                        <InfoProduct data={product} detail isLoading={isLoading} />
                    </div>
                    <div className="flex-1">
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
                <div className="w-main mb-10">
                    <Tabs>
                        <TabList>
                            {detailProductTabs[0].map((item) => (
                                <Tab key={item.id}>
                                    <span className="uppercase text-sm">{item.title}</span>
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanel>
                            {!isLoading ? (
                                <div
                                    className={`border border-[#aaa] border-t-0 p-5 relative ${
                                        !isMore ? 'h-[500px] overflow-hidden' : ''
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
                                    {!isMore && (
                                        <div className="flex justify-center items-end absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff01] to-[#ffffffcc]">
                                            <div
                                                onClick={() => setIsMore(true)}
                                                className="mb-3 p-[8px_20px] flex flex-col items-center cursor-pointer text-[#ffffff] drop-shadow-md hover:text-[#404040] transition-colors"
                                            >
                                                <h1 className="text-3xl uppercase font-bold">see more</h1>
                                                <span className="">
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
                        {detailProductTabs[1].map((item) => (
                            <TabPanel key={item.id}>
                                <div className="border border-[#aaa] border-t-0 p-5 ">
                                    {item.subTitle !== '' && (
                                        <h2 className="text-lg text-[#505050] font-semibold uppercase mb-5">
                                            {item.subTitle}
                                        </h2>
                                    )}
                                    <p className="whitespace-pre-line">{item.content}</p>
                                </div>
                            </TabPanel>
                        ))}
                        <TabPanel>
                            <Review />
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="w-main h-auto mb-20">
                    <div className="w-full mb-5 flex justify-center items-center relative">
                        <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">other products</h2>
                        <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
                    </div>
                    {others?.length > 0 ? (
                        <Slider {...settingsProducts}>
                            {others?.map((item, index) => (
                                <ProductItem key={index} data={item} detail cateType={type} />
                            ))}
                        </Slider>
                    ) : (
                        <div className="w-full flex justify-center items-cente text-[#8b8b8b] text-xl">No product</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
