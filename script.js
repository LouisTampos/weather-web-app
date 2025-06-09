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

            
            console.log("Current Weather:", currentData);

            city.innerHTML = `${currentData.location.name}, ${currentData.location.country}`;
           
            fetch(`${WEATHER_DATA_ENDPOINT}q=${location}`)
                .then((response) => response.json())
                .then((forecastData) => {
                    if (forecastData.error) {
                     alert(forecastData.error.message);
                        return;
                    }

                    console.log("Forecast Data:", forecastData);
                
                })
                .catch(err => console.error("Forecast Fetch Error:", err));
        })
        .catch(err => console.error("Current Weather Fetch Error:", err));
}

