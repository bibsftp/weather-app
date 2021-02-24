import React, { useState, useEffect } from 'react';
import Forecast from "./Forecast";
import axios from "axios";

const GOOGLE_API = {
  key: "AIzaSyDoYEItNCsFASJLS1QHBqsQ-xGL48JAjXg",
}

const api = {
  key: "97f6c11a941a6c4ff34b1c26885988e1",
  base: "https://api.openweathermap.org/data/2.5/"
}

function useBrowserLocation(apiKey) {
  const [locationBar, setLocationBar] = useState(null);
  const googleBase = "https://maps.googleapis.com/maps/api/geocode/json";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const {coords:{latitude, longitude}} = position
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      const response = await axios.get(`${googleBase}?latlng=${latitude},${longitude}&key=${apiKey}`)
    
      console.log(response)
      const city = response.data.results[0].address_components.find(
        (locality) => locality.types.includes('postal_town')
      );
      setLocationBar(city.long_name);
      console.log("CITY", city.long_name)
    });
  });

  return locationBar;
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [isValid, setIsValid] = useState(true);

  const discoveredLocation = useBrowserLocation(GOOGLE_API.key);
  
  useEffect(() => {
    if (discoveredLocation === null) return
    if (query.length > 0) return;
    setQuery(discoveredLocation);
  }, [discoveredLocation]);
    //another variable, useState
    //useEffect - set the variable
    //use in query
    //trigger search
    //geolocation, updates, searchbox in one variable
    //every time variable changes, new forecast
    //listening for changes

  const search = evt => {
    if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        //check discoveredLocation
        //useEffect
        .then(res => res.json())
        .then(result => {
          if (result.cod !== 200) {
            setIsValid(false);
            return;
          }

          setWeather(result);
          setQuery('');
          setIsValid(true);
          console.log(result);
        });
    }
    //evt.preventDefault();
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main !== "undefined")
      ? ((weather.main.temp > 16)
        ? 'app warm'
        : 'app')
      : 'app'}>
      <main>
      <div className="title">Weather Finder</div>
      <br/>
      <br/>
      <Forecast/>
        <div className="search-box">
          <input
           type="text"
           className="search-bar"
           placeholder="Search..."
           onChange={e => setQuery(e.target.value)}

           value={query}
           onKeyPress={search}
           />
        </div>
        {isValid ?
          <div>
          {weather.sys && weather.main && (
              <div>
                  <div className="location-box">
                      <div className="location">{weather.name}, {weather.sys.country}</div>
                      <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                      <div className="temp">
                      {Math.round(weather.main.temp)}°c
                      </div>
                      <div className="weather">{weather.weather[0].main}</div>
                  </div>
              </div>
          )}
          </div>
          :
              <div className="error">
                Please enter a valid City Name.
              </div>
          }
       </main>
      
    </div>
  );
}

export default App;
