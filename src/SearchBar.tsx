import React, {type RefObject, useState} from 'react';
import { TextField, Button } from "@vega-ui/react";
// import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (city: string) => void;
    inputRef: RefObject<HTMLInputElement | null>
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, inputRef }) => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "2b23e648be7f4cd2f5098ea7b65889ec";

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);

        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            const cityNames = data.map(
                (c: any) => `${c.name}${c.state ? ", " + c.state : ""}, ${c.country}`
            );

            setSuggestions(cityNames);
        } catch (error) {
            console.error("Ошибка загрузки подсказок:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (selectedCity?: string) => {
        const finalCity = selectedCity || city;
        if (finalCity.trim()) {
            onSearch(finalCity);
            setCity(finalCity);
            setSuggestions([]);
        }
    };

    return (
        <div className="SearchBar">
            <TextField
                placeholder="Enter your city..."
                value={city}
                ref={inputRef}
                onChange={handleChange}
            />
            <Button onClick={() => handleSearch()}>
                Search
            </Button>

            {loading && <div className="ListOfCity">Loading...</div>}

            {suggestions.length > 0 && (
                <ul className="ListCity">
                    {suggestions.map((s, index) => (
                        <li
                            key={index}
                            onClick={() => handleSearch(s)}
                            className="CityItem"
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
