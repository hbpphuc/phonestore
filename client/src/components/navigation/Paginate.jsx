import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import ReactPaginate from 'react-paginate'
import Icon from '../general/Icons'

const Paginate = ({ itemCount, itemsPerPage, onSetPage }) => {
    const [pageCount, setPageCount] = useState(1)

    const flag = itemCount > itemsPerPage

    useEffect(() => {
        setPageCount(Math.ceil(itemCount / itemsPerPage))
    }, [itemsPerPage, itemCount])

    const handlePageClick = (e) => {
        onSetPage(e.selected + 1)
    }

    return (
        <>
            <ReactPaginate
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={flag ? pageCount : 0}
                previousLabel={flag && <Icon.HiOutlineArrowNarrowLeft size={22} color="#0c0c0c" />}
                nextLabel={flag && <Icon.HiOutlineArrowNarrowRight size={22} color="#0c0c0c" />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-btn"
                previousLinkClassName="page-link"
                nextClassName="page-btn"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                activeClassName="active"
                renderOnZeroPageCount={null}
                className="flex justify-center items-center gap-1 text-white"
            />
        </>
    )
}

export default memo(Paginate)
