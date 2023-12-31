import React from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import Icon from '../general/Icons'

const Breadcrumb = ({ title }) => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className="w-full px-[10px] xl:w-main h-full flex flex-col">
            <h3 className="mb-[10px] text-lg text-secondary font-semibold uppercase">
                {title || breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children}
            </h3>
            <div className="flex">
                {breadcrumbs.map(({ match, breadcrumb }, index, self) => (
                    <div key={match.pathname} className="flex justify-center items-center">
                        {index !== self.length - 1 ? (
                            <Link to={match.pathname} className="flex items-center">
                                <span
                                    className={`text-primary ${
                                        index !== self.length - 1
                                            ? 'text-[#1d1d1d] hover:text-main transition-colors cursor-pointer'
                                            : 'cursor-text'
                                    }`}
                                >
                                    {breadcrumb}
                                </span>
                            </Link>
                        ) : (
                            <span
                                className={`text-primary ${
                                    index !== self.length - 1
                                        ? 'text-[#1d1d1d] hover:text-main transition-colors cursor-pointer'
                                        : 'cursor-text'
                                }`}
                            >
                                {breadcrumb}
                            </span>
                        )}
                        {index !== self.length - 1 && (
                            <span>
                                <Icon.MdNavigateNext />
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Breadcrumb)
