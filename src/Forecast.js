import React, { useState } from "react";

const api = {
    key: "97f6c11a941a6c4ff34b1c26885988e1",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  function Forecast() {

    const [query, setQuery] = useState('');
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState();
    const [country, setCountry] = useState();

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        const dailyData = result.list.filter(reading => {
          return reading.dt_txt.includes("18:00:00")
          }
        )
        setQuery('');
        console.log(result);

        setForecast(dailyData);
        console.log(dailyData);

        setCity(result.city && result.city.name);
        setCountry(result.city && result.city.country);
      });

    }
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
    <div className="search-box">
    <input
     type="text"
     className="search-bar"
     placeholder="Get Forecast..."
     onChange={e => setQuery(e.target.value)}
     value={query}
     onKeyPress={search}
     />

    <div className="location">{city}, {country}</div>
     {Array.isArray(forecast)?
      forecast.map((day, index) => (
        <div className="weather-box" key={index}>
          <div className="location-box">
            <div className="date">
              {dateBuilder(new Date(day.dt * 1000))}
            </div>
            <div className="temp">
              {Math.round(day.main.temp)}°c
              <br/>
              <div className ="minmaxhumidity">
                Max: {Math.round(day.main.temp_max)}°c
                <br/>
                Min: {Math.round(day.main.temp_min)}°c
                <br/>
                Humidity: {Math.round(day.main.humidity)}
                <br/>
              <div className="weather">{day.weather[0].main}</div>
            </div>
            </div>
          </div>
        </div>
      ))
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

     : <div> "No data" </div>}



     {/* map over forecast object */}
     {/* type array */}
     {/* forecast.map
     arrow function each item
     return block that should be rendered */}
  </div>



);


}

export default Forecast;