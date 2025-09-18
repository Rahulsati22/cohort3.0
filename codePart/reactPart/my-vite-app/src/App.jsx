import React, { useState, useEffect, use } from 'react';

function App() {
  //now we will write some code for conditional rendering
  const [isCounterVisible, setIsCounterVisible] = useState(true);
  const [count, setCount] = useState(0)
   
  // useEffect(() => {
  //   setInterval(() => {
  //     setIsCounterVisible(c => !c);
  //   }, 5000);

  //   // return () => clearInterval(interval);

  // }, []);


  useEffect(() => {
    console.log("Count has changed")
    return ()=>{
      console.log("cleanup")
    }
  }, [count])

  //this is the example of conditional rendering
  // return <>{isCounterVisible ? <Counter count={count}/> : <></>}</>;


  return <>
    <button onClick={() => setCount(count + 1)}>
      Increase Count
    </button>

    &nbsp;
    <button onClick={()=>setCount(count - 1)}>Decrease Count</button>

    <div>{count}</div>
  </>
  //or we can also use && operator 'isCounterVisible && <Counter />'
}

function Counter(props) {
  return (
    <>
      <h1 style={{ margin: '10px' }}>{props.count}</h1>
    </>
  );
}

export default App;
