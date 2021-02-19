const getCurrentLocation = () => {
  const [location, setLocation] = useState({
    accessGranted: false
    coordinates: {latitude: "", longitude: ""}
  });

  const onSuccess = location => {
    setLocation({
      accessGranted: true,
      coordinates: {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      }
    })
  };

  const onError = error => {
    setLocation({
      accessGranted: true,
      error,
    })
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation is not enabled on this browser",
      })
    },

      navigator.geolocation.getCurrentPosition(onSuccess, onError)  
      
  }, [])

  const getCurrentWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.userPosition.latitude}&lon=${this.state.userPosition.longitude}&exclude=minutely&appid=ed58f59278aa5bb216a9921e812b2ac6`
    );
    const data = await api_call.json();
    this.setState({
      latitude: lat,
      longitude: lon,
      current_weather: {
        time: current.dt,
        temperatureC: Math.round(current.temp),
        weather_description: current.weather.id,
      },
    })
    return getCurrentWeather()
  }
      
}

return location;
