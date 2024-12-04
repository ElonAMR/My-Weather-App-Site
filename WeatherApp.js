const apiKey = "YOUR_API_KEY";
let city = "YOUR_LOCATION_DEFAULT";
let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;


let weatherData={};

async function fetchWeatherData(){
    try{
        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Problem receiving data");
        }

        weatherData = await response.json();
        console.log(weatherData);
        updateWeatherDisplay(weatherData);
    }
    catch (e){
        console.log(e);
        throw e;
    }
}




function checkLocationPermission() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
                await fetchWeatherData();
            },
            async () => {
                // במקרה של סירוב, טען את מזג האוויר לפי תל אביב
                console.warn("Location access denied. Using default location (Tel Aviv).");
                await fetchWeatherData();
            }
        );
    } else {
        console.warn("Geolocation not supported. Using default location (Tel Aviv).");
        fetchWeatherData();
    }
}

// called first when site up
checkLocationPermission();







function handleSearch() {
    const locationInput = document.getElementById("location-input").value.trim();

    if (locationInput) {
        city = locationInput; // Update city based on user input
        url =  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`; // Update URL
        fetchWeatherData()
            .then(() => {
                console.log("The request was completed successfully");
            })
            .catch((error) => {
                console.error("Error in processing:", error);
            });
    } else {
        alert("You Need Write Location!");
    }
    document.getElementById("location-input").value = "";
}




function updateWeatherDisplay(weatherData) {
    // update values data colum1
    document.getElementById("temperature").textContent = `${weatherData.current.temp_c || "N/A"}°C`;
    document.getElementById("location-name").textContent = weatherData.location.name || "N/A";
    let text = weatherData.current.condition.text || "N/A";
    document.getElementById("weather-text").textContent = text;

    // update values data colum2
    document.getElementById("tz-id").textContent = weatherData.location.tz_id || "N/A";
    document.getElementById("country").textContent = weatherData.location.country || "N/A";
    document.getElementById("local-time").textContent = `${weatherData.location.localtime || "N/A"}`;

    document.getElementById("cloudy-value").textContent = `${weatherData.current.cloud || 0}%`;
    document.getElementById("Day-Night").textContent = weatherData.current.is_day === 1 ? "Day" : "Night";
    document.getElementById("Temp-F").textContent = `${weatherData.current.temp_f || "N/A"}°F`;
    document.getElementById("Feel-Like").textContent = `${weatherData.current.feelslike_c || "N/A"}°C`;
    document.getElementById("humidity-value").textContent = `${weatherData.current.humidity || 0}%`;
    document.getElementById("wind-value").textContent = `${weatherData.current.wind_kph || 0} kph`;
    document.getElementById("Wind-direction").textContent = `${weatherData.current.wind_dir || "N/A"}`;
    document.getElementById("Uv").textContent = `${weatherData.current.uv || 0}`;
    document.getElementById("precip-mm").textContent = `${weatherData.current.precip_mm || 0} mm`;

    updateWeatherIcon(weatherData.current.condition.text, weatherData.current.is_day === 1);
}




function updateWeatherIcon(conditionText, isDay) {
    let icon = "";
    let backgroundImage = "";

    switch (conditionText.toLowerCase()) {
        case "clear":
            icon = isDay ? "fa-solid fa-sun" : "fa-solid fa-moon";
            backgroundImage = isDay ? "url('Images/sunny.jpg')" : "url('Images/night.jpg')";
            break;

        case "sunny":
            icon = "fa-solid fa-sun";
            backgroundImage = "url('Images/sunny.jpg')";
            break;

        case "rain":
        case "light rain":
            icon = isDay ? "fa-solid fa-cloud-sun-rain" : "fa-solid fa-cloud-moon-rain";
            backgroundImage = "url('Images/rain.jpg')";
            break;
        case "fog":
        case "mist":
        case "cloudy":
        case "overcast":
        case "partly cloudy":
            icon = isDay ? "fa-solid fa-cloud-sun" : "fa-solid fa-cloud-moon";
            backgroundImage = isDay ? "url('Images/overcast.jpg')" : "url('Images/nightOvercast.jpg')";
            break;

        case "snow":
            icon = "fa-solid fa-snowflake";
            backgroundImage = "url('Images/snow.jpg')";
            break;

        default:
            icon = "fa-solid fa-question";  
            backgroundImage = "url('Images/default.jpg')";
            break;
    }

    document.getElementById("weather-icon").className = icon;  

    document.querySelector(".container-Weather").style.backgroundImage = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
        ${backgroundImage}
    `;
}
