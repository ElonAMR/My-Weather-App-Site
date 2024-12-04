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
