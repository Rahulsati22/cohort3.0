import React from 'react'
import { useRef } from 'react'
const Example = () => {
    const inputRef = useRef()
    function changeWidth() {
        if (inputRef.current.style.width === '400px') {
            inputRef.current.style.width = '200px'
            return
        }
        inputRef.current.style.width = '400px'
    }
    return (
        <div style={{ width: '100vw', height: '90vh', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <input ref={inputRef} type="text" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <button style={{ cursor: 'pointer', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} onClick={changeWidth}>Change</button>
        </div>
    )
}

export default Example
