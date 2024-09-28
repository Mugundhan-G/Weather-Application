const apiKey = '766253fec1a27ad47179045a17b53d75';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

var searchbtn = document.querySelector('.searchButton');  //selected search button

// Function to check the weather for a given city
async function checkWeather(city) {
    try {
        var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();


        // Check if the API returned valid data
        if (response.ok && data.main) {
            document.querySelector('.degree').innerHTML = Math.round(data.main.temp) + '°c';  //selected degree class and updated with temperature
            document.querySelector('.state').innerHTML = data.name;                           //selected state class and updated with stateName
            document.querySelector('.humidityValue').innerHTML = data.main.humidity + '%';    //selected humidityValue class and updated with humidityValue
            document.querySelector('.windSpeed').innerHTML = data.wind.speed + 'Km/h';  //selected windspeed class and updated with wind speed

            var weatherIcon = document.querySelector('.weatherImage');

            // Setting the weather icon based on the returned weather condition
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = 'images/clouds.png';
            } else if (data.weather[0].main == "Wind") {
                weatherIcon.src = 'images/wind.png';
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = 'images/drizzle.png';
            } else if (data.weather[0].main == "Humidity") {
                weatherIcon.src = 'images/humidity.png';
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = 'images/mist.png';
            } else if (data.weather[0].main == "Snow") {
                weatherIcon.src = 'images/snow.png';
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = 'images/clear.png';
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = 'images/rain.png';
            }

            // Show weather details and hide the error
            document.querySelector('.layout2').style.display = "block";
            document.querySelector('.typeError').style.display = "none";
        } else {
            // If the city is not found, show an error
            document.querySelector('.typeError').style.display = "block";
            document.querySelector('.layout2').style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector('.typeError').style.display = "block";
        document.querySelector('.layout2').style.display = "none";
    }
}

// Get the input value from the search box
searchbtn.addEventListener("click", () => {
    var searchInput = document.querySelector('.searchBox').value;  // Corrected value access
    if (searchInput) {
        checkWeather(searchInput);
    } else {
        document.querySelector('.typeError').style.display = "block";
        document.querySelector('.layout2').style.display = "none";
    }
});
