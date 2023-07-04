import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import Icon from './Icons'

const Breadcrumb = ({ name }) => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className="w-main h-full flex flex-col">
            <h3 className="mb-[10px] text-xl text-secondary font-semibold uppercase">{name}</h3>
            <div className="flex">
                {breadcrumbs.map(({ match, breadcrumb }, index, self) => (
                    <Link key={match.pathname} to={match.pathname} className="flex items-center">
                        <span
                            className={`text-primary ${
                                index !== self.length - 1
                                    ? 'text-[#1d1d1d] hover:text-main transition-colors cursor-pointer'
                                    : 'cursor-text'
                            }`}
                        >
                            {breadcrumb}
                        </span>
                        {index !== self.length - 1 && (
                            <span>
                                <Icon.MdNavigateNext />
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Breadcrumb
