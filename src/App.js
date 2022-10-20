import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [ info, setInfo] = useState({} )
  // const day = new Date(info.location.localtime).toDateString();

  const getDetails = (cityName) =>{
    if(!cityName) return
    const api = `http://api.weatherstack.com/current?access_key=567da32557f2c89d438341b441070484&query=${cityName}`
    axios.get(api).then((res)=>{
      console.log("response", res.data);
      setInfo(res.data);
    }).catch((err)=>{
      console.log("err", err);
    })
  }

  const handleChange =(e) =>{
    console.log("value", e.target.value);
    setCity(e.target.value);
  }

  const handleSearch = () =>{
    getDetails(city);
  }
  
  return (
    <>
      <div className='App'>
        <h1>Weather Forecast App</h1><br />
        
        <input className='input' type="text" value={city} onChange={handleChange} placeholder ='Search'/>
        <button type='button' onClick={handleSearch} >Search</button>
        

      </div>
      {
        Object.keys(info).length > 0 && 
        <div className='details'>
          <div className='img'><img src={info.current.weather_icons} alt="" /></div>
          <div> Location : {info?.location.name} {info.location.country} {info.location.region}</div>
          <p>Temprerature: {info.current.temperature}°C</p>
          <p>Wind speed : {info.current.wind_speed} km/h</p>
          <p>Humidity : {info.current.humidity} %</p>
          <p>LocalTime :  {info.location.localtime}</p>

        </div>
      }
    </>
  );
}

export default App;
