const userLocation = document.getElementById("userLocation");
const converter = document.getElementById("converter");
const weatherIcon = document.querySelector(".weatherIcon");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feelsLike");
const description = document.querySelector(".description");
const date = document.querySelector(".date");
const city = document.querySelector(".city");

const hValue = document.getElementById("hValue");
const wValue = document.getElementById("wValue");
const srValue = document.getElementById("srValue");
const ssValue = document.getElementById("ssValue");
const cValue = document.getElementById("cValue");
const sValue = document.getElementById("sValue");
const pValue = document.getElementById("pValue");

const forecast = document.querySelector(".forecast");

const GEO_API_KEY = "d016363c6fc1b3ed8f1d29f9ff4cc5c1";
const GEO_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${GEO_API_KEY}&q=`;

window.onload = () => {
    userLocation.value = "Dehradun";
    findUserLocation();
};

function findUserLocation() {
    const location = userLocation.value.trim();
    if (!location) {
        alert("Please enter a location name.");
        return;
    }
    fetch(GEO_ENDPOINT + encodeURIComponent(location))
        .then(response => response.json())
        .then(data => {
            if (!data.coord) {
                alert("Invalid location or no coordinates found.");
                return;
            }
            console.log(data);

            weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
            city.innerHTML = data.name+", "+data.sys.country;
            temperature.innerHTML = tempConverter(data.main.temp);
            feelsLike.innerHTML = "Feels Like " + tempConverter(data.main.feels_like);
            description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp ` + data.weather[0].description;

            const option1 = {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            date.innerHTML = getLongFormatDateTime(data.dt, data.timezone, option1);

            hValue.innerHTML = Math.round(data.main.humidity) + "<span>%</span>";
            wValue.innerHTML = Math.round(data.wind.speed) + "<span>m/s</span>";

            const option2 = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            srValue.innerHTML = getLongFormatDateTime(data.sys.sunrise, data.timezone, option2) + "<br>Sunrise";

            const option3 = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            ssValue.innerHTML = getLongFormatDateTime(data.sys.sunset, data.timezone, option3) + "<br>Sunset";;

            cValue.innerHTML = Math.round(data.clouds.all) + "<span>%</span>";
            sValue.innerHTML = data.main.grnd_level + "<span>hpa</span>";
            pValue.innerHTML = Math.round(data.main.pressure) + "<span>hpa</span>";
        })
}

function formatUnixTime(dtValue, offset, options = {}){
    const date = new Date((dtValue + offset) * 1000);
    return date.toLocaleTimeString([], {timeZone: "UTC", ...options});
}

function getLongFormatDateTime(dtValue, offset, options){
    return formatUnixTime(dtValue, offset, options);
}

function tempConverter(temp) {
    const tempValue = Math.round(temp);
    let message = "";
    if (converter.value == "°C") {
        message = `${tempValue}<span>°C</span>`;
    } else {
        const ctof = Math.round((tempValue * 9) / 5 + 32);
        message = `${ctof}<span>°F</span>`;
    }
    return message;
}

converter.addEventListener("change", () => {
    const locationName = userLocation.value.trim();
    if (locationName) {
        findUserLocation();
    }
});