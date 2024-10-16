import React, { useEffect, useState } from 'react'

const Data = (props) => {
    const {data}=props.data;
    const [totalcost,settotalcost]=useState(0);
    const [totalsub,settotalsub]=useState(0);
    let total=0;
    let totalDelivered=0;
    let submissons=0;
    const [tabledata,settabledata]=useState([]);
    let tabledataa=[];
    const [select,setselect]=useState("Select a service");
    const [result,setresult]=useState();
    console.log(data)


    useEffect(()=>{  
    if(data.length!==0){
        //step1 is i am getting key value pair from object enteries
        for(const [key,value] of Object.entries(data)){
            console.log("key:" +key);
            console.log("value:"+value);

        //step2-values is also an object 
        for(const enteries of Object.values(value)){
            //step3 check if we have array or obj structute inside 
             if(Array.isArray(enteries)){
                //if its array
                enteries.forEach(entry=>{
                   console.log("entry:"+ typeof(entry));
                   total+=entry.totalcost || 0;//if no total cost exist set 0
                   totalDelivered+=parseInt(entry.delivered || 0);
                  //pushing to table arr so it becomes easy to map
                   tabledataa.push({
                    key,
                    smscost:entry.smscost || "N/A",
                    totalcost:entry.totalcost || 0,
                    delivered:entry.delivered || 0,
                    failed:entry.failed || 0
                   });
                });
             }else{
                //if its object
                for (const subentry of Object.values(enteries)){
                    total+=subentry.totalcost || 0;
                    totalDelivered+=parseInt(subentry.delivered || 0);
                    //add table data
                    tabledataa.push({
                        key,
                        smscost:subentry.smscost || "N/A",
                        totalcost:subentry.totalcost || 0,
                        delivered:subentry.delivered || 0,
                        failed:subentry.failed || 0
                    });

                }

             }
        }
        }
        settabledata(tabledataa);
        settotalcost(total);
        settotalsub(totalDelivered);
    }
},[data]);



  


    const filteredRows = select
        ? tabledata.filter(row => row.key === select)
        : tabledata;



          
          
            const filtertotal = select 
            ? tabledata.reduce((acc, data) => {
                if (data.key === select) {
                    return acc + data.totalcost; // Accumulate total cost
                }
                return acc; // Return the accumulator unchanged if not matching
            }, 0) // Start with an initial value of 0
            : totalcost;


            const filtersub=select ? tabledata.reduce((acc,data)=>{
                if(data.key===select){
                    return acc+data.delivered;
                }
                return acc;
            },0):totalsub;


  
   

   
  return (
    <div>

        
      
      {tabledata.length>1 && <div> 
        
        <div>
           <h1>
           <label htmlFor="services">Select a Service</label>
            </h1>
           <select  value={select}
                onChange={(e) => setselect(e.target.value)} style={{width:'200px',height:'30px'}} id='services'>
               <option value="">Select a service...</option>
                {tabledata.map((data,key)=>(
                    
                    <option key={key}>{data.key}</option>
                ))}
           </select>
        </div>
        
         <div>
            <h1>Total Cost - {filtertotal}</h1>
            <h1>Total Submissions- {filtersub}</h1>
        </div>
        <table style={{width:'100%',border:'1px solid white'}}>
       
       
        <thead>

       
      <tr style={{padding:'10px',margin:'10px'}}>
        <th style={{padding:'10px'}}>Service Name</th>
        <th style={{padding:'10px'}}>smsCost</th>
        <th style={{padding:'10px'}}>TotalCost</th>
        <th style={{padding:'10px'}}>Delivered</th>
        <th style={{padding:'10px'}}>Failed</th>
      </tr>
      </thead>

    {filteredRows.map((data)=>(
        <>
     
       <tr key={data.key}>
        <td >{data.key}</td>
        <td>{data.smscost}</td>
        <td>{data.totalcost}</td>
        <td>{data.delivered}</td>
        <td>{data.failed}</td>
       </tr>
       </>
    ))}
        </table></div>}
    </div>
  )
}

export default Data
