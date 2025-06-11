const userLocation = document.getElementById("userLocation"),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");


WEATHER_API_ENDPOINT= `https://api.weatherapi.com/v1/current.json?key=98917380edfa448f80672505250806&q=`;
WEATHER_DATA_ENDPOINT=`https://api.weatherapi.com/v1/forecast.json?key=98917380edfa448f80672505250806&days=7&`;  

function findUserLocation() {
    const location = userLocation.value.trim();

    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    
    fetch(`${WEATHER_API_ENDPOINT}${location}`)
        .then((response) => response.json())
        .then((currentData) => {
            if (currentData.error) {
                alert(currentData.error.message);
                return;
            }
            
             weatherIcon.style.backgroundImage = `url("https:${currentData.current.condition.icon}")`;
            temperature.innerHTML = `${currentData.current.temp_c}°C / ${currentData.current.temp_f}°F`;
            feelsLike.innerHTML = `Feels like: ${currentData.current.feelslike_c}°C / ${currentData.current.feelslike_f}°F`;
            description.innerHTML = currentData.current.condition.text;
            city.innerHTML = `${currentData.location.name}, ${currentData.location.country}`;
            date.innerHTML = new Date(currentData.location.localtime).toDateString();

            
            HValue.innerHTML = currentData.current.humidity + "<span>%</span>";
            WValue.innerHTML = currentData.current.wind_kph + "<span> km/h</span>";
            CValue.innerHTML = currentData.current.cloud + "<span>%</span>";
            UVValue.innerHTML = currentData.current.uv;
            PValue.innerHTML = currentData.current.pressure_mb + "<span> hPa</span>";

        
            fetch(`${WEATHER_DATA_ENDPOINT}q=${location}`)
                .then((response) => response.json())
                .then((forecastData) => {
                    if (forecastData.error) {
                     alert(forecastData.error.message);
                        return;
                    }
                   
                    console.log("Forecast Data:", forecastData);
                    
                    SRValue.innerHTML = forecastData.forecast.forecastday[0].astro.sunrise;
                    SSValue.innerHTML = forecastData.forecast.forecastday[0].astro.sunset;
                    
                   
                })
                .catch(err => console.error("Forecast Fetch Error:", err));
        })
        .catch(err => console.error("Current Weather Fetch Error:", err));
}
