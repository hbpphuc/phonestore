import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import * as apis from '../../apis'
import { Breadcrumb, InfoProduct } from '../../components'
import { detailProductTabs, productExtrainInfo } from '../../utils/menu'

const DetailProduct = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const { slug } = useParams()

    const getProductSlug = async () => {
        const res = await apis.getProductBySlug({ slug })
        if (!res) return navigate('/not-found', { replace: true })
        setProduct(res?.data?.data)
    }

    useEffect(() => {
        getProductSlug()
    }, [])

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb name={product?.name} />
                </div>
                <div className="w-main h-auto mb-20 flex justify-center">
                    <div className="w-[80%]">
                        <InfoProduct data={product} detail />
                    </div>
                    <div className="flex-1">
                        <ul className="w-full h-full">
                            {productExtrainInfo.map((item) => (
                                <li
                                    key={item.id}
                                    className="w-full h-[60px] flex gap-2 p-[10px] mb-[10px] text-sm font-normal leading-[6px] border border-[#ebebeb]"
                                >
                                    <span className="w-10 h-10 flex justify-center items-center rounded-full text-xl text-white bg-[#505050]">
                                        {item.icon}
                                    </span>
                                    <span className="flex-1 h-full flex flex-col justify-center gap-1">
                                        <h3 className="flex-1 h-[50%] flex items-center capitalize text-base  text-primary">
                                            {item.title}
                                        </h3>
                                        <h3 className="flex-1 h-[50%] flex items-center capitalize text-xs text-[#999]">
                                            {item.subTitle}
                                        </h3>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-main mb-20">
                    <Tabs>
                        <TabList>
                            {detailProductTabs.map((item) => (
                                <Tab key={item.id}>
                                    <span className="uppercase">{item.title}</span>
                                </Tab>
                            ))}
                        </TabList>

                        {detailProductTabs.map((item) => (
                            <TabPanel key={item.id}>
                                <div className="border border-[#aaa] border-t-0 p-5 ">
                                    {item.subTitle !== '' && (
                                        <h2 className="text-xl text-[#505050] font-semibold uppercase mb-5">
                                            {item.subTitle}
                                        </h2>
                                    )}
                                    <p className="whitespace-pre-line">{item.content}</p>
                                </div>
                            </TabPanel>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
