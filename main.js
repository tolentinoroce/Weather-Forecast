const apiKey = "2a6e4864588d051d19a67b90d996f4f8";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function scanWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        // Update weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".sea").innerHTML = data.main.sea_level+ " Mls";
        
        // Calculate local time in city based on timezone offset
        const timezoneOffset = data.timezone;
        const localTime = new Date();
        localTime.setSeconds(localTime.getSeconds() + timezoneOffset);
        document.querySelector(".timezone").innerHTML = `Local Time: ${localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;

        // Update weather icon based on condition
        if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear_wtbg.gif";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds_wtbg.gif";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain_wtbg.gif";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist_wtbg.gif";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle_wtbg.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow_wtbg.gif";
        }
    } catch (error) {
        alert(error.message);
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city !== "") {
        scanWeather(city);
    }});

// Add event listener for Enter key
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value;
        if (city !== "") {
            scanWeather(city);
        }
    }});
