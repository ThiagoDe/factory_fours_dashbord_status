import React from 'react';
import './chart.css';
import { useState, useEffect } from "react";

function Chart({request}) {

  const [apistate, setApistate] = useState()

  // Set time interval between API call status requests in miliseconds
  // e.g 10s => 10000, 15s => 15000, 30s => 30000 ...
  useEffect(() => {
    data(request);
    const intervalId = setInterval(() => {
      data(request);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [request]);

  
  const data = async (value) => {
    await fetch(`https://api.factoryfour.com/${value}/health/status`)
      .then((res) => res.json())
      .then((data) => setApistate(data))
      .catch((err) => { console.log(err) });
  };

  let calculateTime = (number) => {
    let time = new Date(number)
    return time.toTimeString().split(" ")[0]
  }

  let actualTime = calculateTime(apistate?.time)


  return (
    <div className='chart-container'>
      
      <h2 className='chart-name'>{request.toString().toUpperCase()}</h2>
      <h3 className={apistate?.success ? "chart-healthy" : "chart-error"}>{apistate?.success ? "Healthy" : "Error"}</h3>
      <h4 className={apistate?.success ? "chart-healthy-hostname" : "chart-error-hostname"}>{apistate?.success ? apistate.hostname : "MAJOR OUTAGE"}</h4>
      <h4 className={apistate?.success ? "chart-healthy-time" : "chart-error-time"}>{apistate?.success ? actualTime : "403 Forbidden"}</h4>
    </div>
  )   
}

export default Chart