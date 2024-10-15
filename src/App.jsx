import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Data from './Data'
function App() {
  const [count, setCount] = useState(0)
  const [data,setdata]=useState([]);



  const [fromdate,setfromdate]=useState('');
  const [todate,settodate]=useState('');
  


  function handlefromdate(e){
    setfromdate(e.target.value);
   
  }
  function handletodate(e){
    settodate(e.target.value);
 
  }
   async function getdata(){

    console.log("inside getdata")
       try {
           const result=await fetch(`https://napi.authkey.io/api/react_test?from_date=${fromdate}&to_date=${todate}`);
           const ogresult=await result.json();
           setdata(ogresult.data);
       
           console.log(data);
       } catch (error) {
               console.log(error);
       }
   }







   useEffect(()=>{
   
  },[fromdate,todate])


 

  return (
    <>
<h1>Datagen</h1>
<div>
<label htmlFor="from">From-</label>
<br></br>
<input type="date"  value={fromdate} onChange={handlefromdate} id='from'/>

<label htmlFor="to">To-</label>
<br></br>
<input type="date" value={todate} onChange={handletodate} id='to'/>


<button type='submit' onClick={getdata}>Submit</button>
</div>


{
  data && <Data data={{data}} />
}

    </>
  )
}

export default App
