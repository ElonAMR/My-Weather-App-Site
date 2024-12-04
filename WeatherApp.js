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
