import React, { useContext } from 'react' //use context comes from react
import BulbState from './BulbState'
import Button from './Button'
import { useState } from 'react'
import { BulbContext } from '../store/context'
const LightBulb = () => {
    const {bulbOn, setBulbOn} = useContext(BulbContext)
    const handleClick = () => {
        setBulbOn(!bulbOn)
    }
    return (
        <div>
            <BulbState bulbOn={bulbOn} />
            <Button bulbOn={bulbOn} setBulbOn={setBulbOn} handleClick={handleClick} />
        </div>
    )
}

export default LightBulb
