import './App.module.css'
import {Alert, Button, Text, TextField} from "@vega-ui/react";
import {useEffect, useRef, useState} from "react";
/*
import style from './App.module.css'
*/

function App() {

    const inputRef = useRef()
    const [WeatherData, setWeatherData] = useState(false);
    const [isVisibleInfo, setIsVisibleInfo] = useState(false);

/*    const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }*/



     async function search(city): Promise<void> {
         try {
             const API_KEY = "2b23e648be7f4cd2f5098ea7b65889ec"
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
             const response = await fetch(url);
             const data = await response.json();
             console.log(data);
/*             const icon = allicons[data.weather[0].icon] || clear_icon;*/
             setWeatherData({
                 humidity: data.main.humidity,
                 windSpeed: data.wind.speed,
                 temperature: Math.floor(data.main.temp),
                 location: data.name,
                 icon: data.weather[0].icon,
             });
         }catch(error){
             console.log(error)
         }
     }

    useEffect(() => {
        search("London")
    }, []);

  return (
    <div className="App">
        <div className="BackBox">
            <div className="Search">
                <TextField placeholder="Enter your city..." ref={inputRef}></TextField>
                <Button onClick={()=>search(inputRef.current.value)}>Search</Button>
            </div>
            <img src={`./src/assets/${WeatherData.icon}.png`} alt="Weather"/>
            <div className="Grid">
                <Text>Город: {WeatherData.location}</Text>
                <Text>Температура: {WeatherData.temperature} C</Text>
                <Text>Влажность: {WeatherData.humidity}%</Text>
                <Text>Скорость ветра: {WeatherData.windSpeed} м/с</Text>
            </div>
            <Button className="quest" onClick={() => setIsVisibleInfo((prev) => !prev)}>?</Button>
            {isVisibleInfo && <Alert className="alert">freak</Alert>}
        </div>
    </div>
  )
}

export default App
