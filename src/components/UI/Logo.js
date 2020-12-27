import React from 'react'

function Logo({ text, className }) {
    return (
        <h1 className={`${className} text-xl md:text-2xl font-bold`}>{text}</h1>
    )
}

export default Logo
