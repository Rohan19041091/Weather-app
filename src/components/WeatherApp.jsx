import React, { useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import clear_icon from '../assets/clear.png'
import rain_icon from '../assets/rain.png'
import drizzle_icon from '../assets/drizzle.png'

const WeatherApp = () => {
  const api_key = "3cd9afa136049270fb0da7039273e4c0";
  const[image,setImage]=useState(null)
  const [location, setLocation] = useState("");
  const [place,setPlace]=useState("")
  const [weatherData, setWeatherData] = useState(null);



  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`);
      const data = await response.json();
      console.log(data.weather[0].main)
      
      if(data.weather[0].main==="Clear"){
          setImage(clear_icon)
      }
      else if(data.weather[0].main=="Clouds"){
        setImage(cloud_icon)
      }
      else if(data.weather[0].main=="Rain"){
        setImage(rain_icon)
      }
      else{
        setImage(drizzle_icon)
      }
      setPlace(data.name);
    
      

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input
          type="text"
          className='cityInput'
          placeholder='Search'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearchClick}>
          <img src={search_icon} alt='' />
        </div>
      </div>

      {weatherData && (
        <>
          <div className="weather-image">
            <img src={image} alt="" />
          </div>
         <p>{weatherData.weather[0].main}</p>
          <div className="weather-temp">
            {Math.round(weatherData.main.temp - 273.15)}°C
          </div>
         
          <div className="weather-location">{place}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" />
              <div className="data">
                <div className="humidity-percent">{weatherData.main.humidity+'%'}</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" />
              <div className="data">
                <div className="humidity-percent">{weatherData.wind.speed}km/h</div>
                <div className="text">Wind</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
