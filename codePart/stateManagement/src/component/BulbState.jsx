import React, { useState } from 'react'

const BulbState = ({bulbOn, setBulbOn}) => {
  return (
    <div>
      {bulbOn ? "bulbOn" : "bulbOff"}
    </div>
  )
}

export default BulbState
