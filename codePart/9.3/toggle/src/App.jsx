import { useState } from 'react'
import Post from './components/Post'
import './index.css'
function App() {
    const [arr, setArr] = useState([{
        name: 'name1',
        followers: 1000,
        image: 'https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.3698267942851394.jpg',
        message: 'this is the message number1 that i am going to show in the post'
    }])
    function addPost() {
        setArr([...arr, {
            name: 'name1',
            followers: 1000,
            image: 'https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.3698267942851394.jpg',
            message: 'this is the message number1 that i am going to show in the post'
        }])
    }
    // return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> <ToggleComponent message={'message1'} /><ToggleComponent message={'message2'} /><ToggleComponent message={'message3'} /> </div>
    return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100vw', minHeight: '100vh', alignItems: 'center', backgroundColor: 'gray' }}>
        <button onClick={addPost} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', borderRadius: '10px', padding: '5px 30px', border: 'none', cursor: 'pointer', marginTop: '10px', backgroundColor: 'cyan' }}>Add</button>
        {
            arr.map((value) => {
                return <Card><Post name={value.name} followers={value.followers} image={value.image} message={value.message} /></Card>
            })
        }
        {/* <Post name={'name1'} followers={1000} image={'https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.3698267942851394.jpg'} message={'this is the message number1 that i am going to show in the post'} /> */}
    </div>
}



function Card({children}){
    return <div className='card'>
        {children}
    </div>
}

//everytime we call this component each component has its own useState variable and conditional rendering logic
// function ToggleComponent({ message }) {
//   const [boolValue, setBoolValue] = useState(true)
//   function toggleValue() {
//     setBoolValue(!boolValue)
//   }
//   // const message = "This is the demo project i am creating to understand about use state variable"
//   return (<div>
//     {boolValue && <p>{message}</p>}
//     <button onClick={toggleValue}>Toggle</button>
//   </div>)
// }

export default App
