import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from './Input'
import Current from './Current.js'
import Forecast from './Forecast';

import './css/weather-icons.min.css'
import './css/App.css';
import './css/Icons.css';
import './css/Input.css';
import './css/Current.css'
import './css/Forecast.css';
import './css/Rwd.css';

const App = () => {
    const initialData = {
        coord: {
            lon: 0,
            lat: 0,
        }
    };

    const [city, setCity] = useState();
    const [data, setData] = useState(initialData);
    const [forecast, setForecast] = useState();

    const getCity = (e) => {
        setCity(e.target.value);
    };

    const getForecastData = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=de310e87d3a7bcda1c723953103565a6&units=metric&lang=pl`)
        .then(response => {
            setForecast(response.data);
        })
    };

    const getCurrentData = (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de310e87d3a7bcda1c723953103565a6&units=metric&lang=pl`)
        .then(response => {
            //success
            document.querySelectorAll('.hide').forEach((section) => {
                section.style.opacity = '0';
            })

            setTimeout(() => {
                setData(response.data);
            }, 400);

            document.querySelector('.error-msg').textContent = '';
            document.querySelector('.input-wrap input').value = '';
        })
        .catch(error => {
            if (document.querySelector('input').value === '') {
                document.querySelector('.error-msg').textContent = 'Musisz podać nazwę miasta!';
                console.log(error);
            } else {
                document.querySelector('.error-msg').textContent = 'Wpisz poprawną nazwę miasta!';
                console.log(error);
            };
        });
    };

    const input = document.querySelector('.city-input');
    const submitCity = (e) => {
        e.preventDefault();
        getCurrentData(city);
        input.style.height = 'auto';
    };

    useEffect(() => {
        const showContent = () => {
            if (data.name !== '') {
                const toShow = document.querySelectorAll('.hide');
                const toDisplay = document.querySelectorAll('.display');

                toDisplay.forEach((item) => {
                    item.style.display = 'block';
                });

                toShow.forEach((item) => {
                    item.style.opacity = '1';
                });
            };
        };
        showContent();
    }, [data]);

    useEffect(() => {
        getForecastData(data.coord.lat, data.coord.lon);
    }, [data.coord.lat, data.coord.lon])

    return (
        <>
            <Input cityName={getCity} checkForm={submitCity} />
            <Current currentData={data} />
            <Forecast forecastData={forecast} />
        </>
    );
}

export default App;