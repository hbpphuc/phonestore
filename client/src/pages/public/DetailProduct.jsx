import React, { memo, useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import * as apis from '../../apis'
import { InfoProduct } from '../../components'
import NotFound from './NotFound'
import { detailProductTabs } from '../../utils/menu'

const DetailProduct = () => {
    const [product, setProduct] = useState(null)

    const { type, id } = useParams()

    console.log({ type, id })

    useEffect(() => {
        const getProduct = async () => {
            const res = await apis.getProduct({ id: '648ae3a9224ab004d716afd2' })
            setProduct(res?.data?.data)
        }
        getProduct()
    }, [])

    return (
        <div className="w-full h-auto flex justify-center items-center flex-col">
            {product ? (
                <div className="">
                    <div className="w-full h-20 py-[15px] mb-5 bg-[#f7f7f7] flex justify-center items-center">
                        <div className="w-main h-full">BREADCRUM</div>
                    </div>
                    <div className="w-main h-auto mb-20 flex justify-center items-center">
                        <div className="w-[80%]">
                            <InfoProduct data={product} detail />
                        </div>
                        <div className="flex-1 bg-slate-500">a</div>
                    </div>
                    <div className="w-main mb-20">
                        <Tabs>
                            <TabList>
                                {detailProductTabs.map((item) => (
                                    <Tab key={item.id}>{item.title}</Tab>
                                ))}
                            </TabList>

                            {detailProductTabs.map((item) => (
                                <TabPanel key={item.id} className="">
                                    <h2 className="text-xl text-[#505050] font-semibold uppercase mb-5">
                                        {item.subTitle}
                                    </h2>
                                    <p>{item.content}</p>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    )
}

export default memo(DetailProduct)
