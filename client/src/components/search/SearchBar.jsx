import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import HeadlessTippy from '@tippyjs/react/headless'
import { useDebounce } from 'use-debounce'
import { Button, Icon, SearchResultPopup } from 'components'
import * as apis from 'apis'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [isFocus, setIsFocus] = useState(false)

    const [value] = useDebounce(searchValue, 600)

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        const searchProducts = async () => {
            const res = await apis.searchProduct({ name: value })
            setSearchResults(res?.data?.product)
        }

        value.length > 0 ? searchProducts() : setSearchResults(null)
    }, [value])

    const onSubmit = async (data) => {
        // const res = await apis.searchProduct(data)
        // console.log('submit form: ', res?.data?.product)
    }

    const renderSearchResult = (attrs) => (
        <div
            tabIndex="-1"
            {...attrs}
            className="w-[526px] border-t-0 border-2 border-main rounded-b-lg bg-white relative -top-[10px]"
        >
            <SearchResultPopup data={searchResults} onSetFocus={setIsFocus} />
        </div>
    )

    return (
        <div className="w-full flex justify-center items-center relative">
            <HeadlessTippy
                interactive
                visible={isFocus && value.length > 0}
                render={renderSearchResult}
                onClickOutside={() => setIsFocus(false)}
                className="w-full flex justify-center items-center relative"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search product name"
                        onFocus={() => setIsFocus(true)}
                        value={searchValue}
                        {...register('name', {
                            onChange: (e) => {
                                setSearchValue(e.target.value)
                            },
                        })}
                        className="flex-1 h-12 text-base font-normal text-secondary p-[8px_10px] border-2 border-main outline-none"
                    />
                    <Button
                        type="submit"
                        className="w-12 h-12 flex justify-center items-center text-white bg-main hover:brightness-95 transition-all"
                    >
                        <Icon.TbSearch size={24} />
                    </Button>
                </form>
            </HeadlessTippy>
        </div>
    )
}

export default SearchBar
