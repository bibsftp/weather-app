import React, { Component } from 'react';

class App extends React.Component {
  //state
  state = {
    userPosition: {
      latitude: {},
      longitude: {}
    },
    data: [],
    dailyData: []
  };

  componentDidMount() {
    //to check whether geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //to get the lat and long of user device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.setState({ userPosition: pos });
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.userPosition.latitude}&lon=${this.state.userPosition.longitude}&exclude=minutely&appid=ed58f59278aa5bb216a9921e812b2ac6`
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ data: data, dailyData: data.daily });
          });
      });
    }
  }

  

ReactDOM.render(<App/>, document.getElementById("root"));
