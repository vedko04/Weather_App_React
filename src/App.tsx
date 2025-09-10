import './App.module.css'
import {Alert, Button, Text} from "@vega-ui/react";
import {useEffect, useRef, useState} from "react";
import SearchBar from "./SearchBar.tsx";

function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [WeatherData, setWeatherData] = useState<any>(false);
    const [isVisibleInfo, setIsVisibleInfo] = useState(false);

    async function search(city: string): Promise<void> {
        try {
            const API_KEY = "2b23e648be7f4cd2f5098ea7b65889ec";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className="App">
            <div className="BackBox">
                <div className="Search">
                    <SearchBar inputRef={inputRef} onSearch={search} />
                </div>
                {WeatherData && (
                    <>
                        <img src={`./src/assets/${WeatherData.icon}.png`} alt="Weather"/>
                        <div className="Grid">
                            <Text>Город: {WeatherData.location}</Text>
                            <Text>Температура: {WeatherData.temperature} C</Text>
                            <Text>Влажность: {WeatherData.humidity}%</Text>
                            <Text>Скорость ветра: {WeatherData.windSpeed} м/с</Text>
                        </div>
                    </>
                )}
                <Button className="quest" onClick={() => setIsVisibleInfo((prev) => !prev)}>?</Button>
                {isVisibleInfo && <Alert className="alert" title={""}>
                    Если у вас не получается найти ваш город, то возможно вы не правильно вводите его название на
                    английском или русском, или вводите его сокращенное название, на подобии, NY(New York) или LA(Los Angeles).
                    Будьте внимательны с правильным написанием городов. Удачи!
                </Alert>}
            </div>
        </div>
    )
}

export default App;
