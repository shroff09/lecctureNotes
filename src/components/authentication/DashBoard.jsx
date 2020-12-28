import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style1.css';
const API_Key= "e8d1b3023dd849cda9575623202812";
const URL = `https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=`;



const DashBoard = () => {

    const [weather,setWeather]=useState(null);
    const [latitude,setlatitude]=useState("");
    const [longitude,setlongitude]=useState("");
    const [user,setUser]=useState(null);
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
    
        navigator.geolocation.getCurrentPosition(function(position) {
          setlatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
        });
      }, []);

    useEffect(() => {
        const expireTime = new Date(
          new Date().setHours(new Date().getHours() + 1)
        );
    
        const expire = "expires=" + expireTime.toUTCString();
    
        if (cookie("weather")) {
          const cookieWeatherData = JSON.parse(cookie("weather"));
          setWeather(cookieWeatherData);
        } else {
          if (latitude && longitude) {
            fetch(`${URL}${latitude},${longitude}`).then((response) => {
              response.json().then((data) => {
                setWeather(data);
    
                document.cookie =
                  "weather" + "=" + JSON.stringify(data) + ";" + expire;
              });
            });
          }
        }
      }, [latitude, longitude]);

    return (
        <div className="container">
            {/* <h2>{user}</h2> */}
            <Link to='/'><button
                className="app-btn"
                onClick={() => {
                  sessionStorage.clear();
                  setUser(null);
                }}
              >
                Logout
              </button></Link>
            <div>
              <h2 className="location">
                Current Location: {weather?.location.name},{" "}
                {weather?.location.region}, {weather?.location.country}
              </h2>
              <h1 className="weather">
                In C: {weather?.current.temp_c} ° <br />
                In F: {weather?.current.temp_f} ° <br />
                Humidity: {weather?.current.humidity} <br />
              </h1>
              <h4>Local Time: {weather?.location.localtime}</h4>
              
            </div>
        </div>
    );
};

function cookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

export default DashBoard;


