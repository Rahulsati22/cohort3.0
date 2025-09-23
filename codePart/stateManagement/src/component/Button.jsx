import React from 'react'

const Button = ({bulbOn, setBulbOn, handleClick}) => {
  return (
    <button onClick={handleClick} style={{width:'200px', padding : '10px', borderRadius : '10px', backgroundColor:'yellow', color:'black', cursor:'pointer', border:'1px solid gray'}}>
        Button
    </button>
  )
}

export default Button
