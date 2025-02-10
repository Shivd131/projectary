import React from 'react'

interface HeaderProps {
    name: string
    buttonComponent?: React.ReactNode
    isSmallText?: boolean
}

const Header = ({ name, buttonComponent, isSmallText }: HeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold text-gray-900 dark:text-white tracking-tight`}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    )
}

export default Header