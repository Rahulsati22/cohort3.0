import { useState } from 'react'
import Button from './component/Button'
import './App.css'
import LightBulb from './component/LightBulb'
import { BulbContext } from './store/context'
function App() {
  const [bulbOn, setBulbOn] = useState(false)

  function BulbProvider(props) {
    return (
      <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbOn: setBulbOn }}>
        {props.children}
      </BulbContext.Provider>
    )
  }


  
  return (
    <BulbProvider>
      <LightBulb />
    </BulbProvider>
  )
}
export default App
