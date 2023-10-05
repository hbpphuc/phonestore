import React, { useState, useEffect } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { Button, Icon, SearchResultPopup } from 'components'
import * as apis from 'apis'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [isFocus, setIsFocus] = useState(false)

    const [value] = useDebounce(searchValue, 600)

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        const searchProducts = async () => {
            const res = await apis.searchProduct({ name: value })
            setSearchResults(res?.data?.product)
        }

        value.length > 0 && !value.startsWith(' ') && searchProducts()
    }, [value])

    const onSubmit = async (data) => {
        if (data[Object.keys(data)] !== '') {
            navigate({
                pathname: 'products',
                search: createSearchParams({ ...data }).toString(),
            })
            setIsFocus(false)
        }
    }

    const renderSearchResult = (attrs) => (
        <div
            tabIndex="-1"
            {...attrs}
            className="w-full min-[425px]:w-[425px] sm:w-[640px] md:w-[526px] border-t-0 border border-gray-200 md:border-2 md:border-main shadow-md rounded-b-lg bg-white relative -top-[10px]"
        >
            <SearchResultPopup data={searchResults} onSetFocus={setIsFocus} />
        </div>
    )

    return (
        <div className="flex-1 flex justify-center items-center relative">
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={isFocus && value.length > 0}
                render={renderSearchResult}
                onClickOutside={() => setIsFocus(false)}
                className="w-full flex justify-center items-center relative"
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex justify-center items-center bg-slate-100 border-b border-gray-300 sm:border-0"
                >
                    <input
                        type="text"
                        spellCheck={false}
                        placeholder="Search product name"
                        onFocus={() => setIsFocus(true)}
                        value={searchValue}
                        {...register('name', {
                            onChange: (e) => {
                                if (!e.target.value.startsWith(' ')) setSearchValue(e.target.value)
                            },
                        })}
                        className="flex-1 h-10 text-sm font-normal text-secondary p-[6px_8px] md:border-2 md:border-main outline-none bg-slate-100"
                    />
                    <Button
                        type="submit"
                        className="w-10 h-10 flex justify-center items-center md:text-white md:bg-main hover:brightness-95 transition-all"
                    >
                        <Icon.TbSearch size={24} />
                    </Button>
                </form>
            </HeadlessTippy>
        </div>
    )
}

export default SearchBar
