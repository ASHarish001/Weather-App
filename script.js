const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "7fbe9f878f888f07d76ea4c5a564afeb";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city !");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    // console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data !");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    // console.log(data);
    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    cityDisplay.classList.add("city-display");
    tempDisplay.classList.add("temp-display");
    humidityDisplay.classList.add("humidity-display");
    descDisplay.classList.add("desc-display");
    weatherEmoji.classList.add("weather-emoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "☁️";

        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";
        
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        
        case(weatherId === 800):
            return "☀️";
        
        case(weatherId > 800):
            return "☁️";
        
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}