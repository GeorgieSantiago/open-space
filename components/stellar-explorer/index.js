import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Space } from './Space'
import { FTL } from './components/FTL'

export const SpaceExplorer = props => {
    const [data] = useState({})
    const [isFtl, updateFtl] = useState(true)
    useEffect(() => {
        updateFtl(false)
    })


    return (isFtl ? <Space /> : (<FTL />)
}