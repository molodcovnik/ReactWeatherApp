import * as React from "react";
import axios from "axios";

import "../styles/Main.css";


function Main() {
    const [days, setDays] = React.useState([1]);
    const [weathers, setWeathers] = React.useState([]);
    const [location, setLocation] = React.useState([]);
    const [isDay, setIsDay] = React.useState([]);
    const [city, setCity] = React.useState(['Москва']);
    const [currentTemp, setcurrentTemp] = React.useState([]);
    const [currentFeelsLike, setcurrentFeelsLike] = React.useState([]);
    const [currentConditionText, setcurrentConditionText] = React.useState([]);
    const [currentConditionImage, setcurrentConditionImage] = React.useState([]);
    const [forecastDayText, setforecastDayText] = React.useState([]);
    const [forecastDayImage, setforecastDayImage] = React.useState([]);

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        // setCity(formJson.city);
        let url = `http://api.weatherapi.com/v1/forecast.json?key=bda93ef31de44c63bc494452231109&q=${city}&days=${days}`;
        getUrl(url);

        // return url
        
        // return formJson.city
        
        
    }
    
    // let url;
    // const url = `http://api.weatherapi.com/v1/forecast.json?key=bda93ef31de44c63bc494452231109&q=${city}`;
    // city.length > 0 ? city :
    if(!weathers.length) {
        getUrl(`http://api.weatherapi.com/v1/forecast.json?key=bda93ef31de44c63bc494452231109&q=${city}&days=${days}`)
    }
    
    function getUrl(url){
        // if(!weathers.length) {
            axios.get(url)
            .then(res => {
                console.log(res.data);
                // console.log(res.data.current.is_day)
                setIsDay(res.data.current.is_day);
                setWeathers(res.data.forecast.forecastday);
                setLocation(res.data.location.name);
                setcurrentTemp(res.data.current.temp_c);
                setcurrentFeelsLike(res.data.current.feelslike_c);
                setcurrentConditionText(res.data.current.condition.text);
                setcurrentConditionImage(res.data.current.condition.icon);
                
                if(isDay === 0) {
                    console.log('ночь');
                } else {
                    console.log('день');
                }
                // setWeathers(res.data);
                // setWeathers(res.data);
            })
            .catch((error)=> {
                console.log(error);
            })
        
        // }
    }
      
    return (
        <main>
            
            <div className="main-container">
                <div className="switch-buttons">
                
                    <button id="one-day" className="selected-button" value={1} onClick={(e) => {
                        console.log(e.target.value);
                        setDays(e.target.value);
                        document.getElementById('five-days').classList.remove('selected-button');
                        document.getElementById('one-day').classList.add('selected-button');
                    }}>1 дней</button> 
                    <button id="five-days" value={5} onClick={(e) => {
                        console.log(e.target.value);
                        setDays(e.target.value);
                        document.getElementById('one-day').classList.remove('selected-button');
                        document.getElementById('five-days').classList.add('selected-button');
                    }}>5 дней</button>
                </div>
                <div className="input-city">
                <form className="form input-city" method="post" onSubmit={handleSubmit}>
                
                    <input type="text" placeholder="Введите название города" name="city" onChange={e => setCity(e.target.value)}/>
                    
                    <button type="submit" onSubmit={handleSubmit}>Показать</button>
                    

                </form>
                </div>
                <div id="weather-info" className={isDay > 0 ? "day": "night"} >
                    <div className="current">
                        <p className="current-temp">{currentTemp}</p>
                        <p className="celcius">Сейчас на улице ощущается как {currentFeelsLike}</p>
                        <p>Город {location}</p>
                    </div>
                    <div className="wrapper-weather-days">
                        {weathers.map(weather =>
                            <div className="day-weather" key={weather.date}>
                                <p>Дата {weather.date}</p>
                                <p className="celcius">Минимальная температура {weather.day.mintemp_c}</p>
                                <p className="celcius">Средняя температура {weather.day.avgtemp_c}</p>
                                <p className="celcius">Максимальная температура {weather.day.maxtemp_c}</p>
                                <p>{weather.day.condition.text}</p>
                                <img src={weather.day.condition.icon} alt="icon" />
                                
                            </div>)}
                    </div>
                    {/* <p>{currentConditionText}</p> */}
                    {/* <img src={currentConditionImage} alt="current-weather" /> */}
                    
                
                </div>
               
            </div>
            
        </main>
    )
}

export default Main;