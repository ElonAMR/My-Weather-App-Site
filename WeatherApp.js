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
