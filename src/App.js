import React, { useState } from 'react';
import Forecast from "./Forecast";

const api = {
  key: "97f6c11a941a6c4ff34b1c26885988e1",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [isValid, setIsValid] = useState(true);

  const search = evt => {
    if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
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
          <br/>
          <br/>
          <br/>
        {
          /* 2. display this if the error state is set */
          ( invalidInputError ) ? ( <div className="error">Could not find the weather for this location.</div> ) : ('')
        }
        <div className="search-box">
<form onSubmit={search}>
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
