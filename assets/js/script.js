// get  variables
const apiKey = "bc2927d413afe0330a0f81aa8575c9c7";
let cityname = "denver";
let holder = document.getElementById("5Day")
let units = "imperial";
let newCity = "";
let timezone = 0;
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const Timeoptions = { hour: 'numeric', minute: 'numeric'};
let currentHolder = document.getElementById("current");
let cityInfo = "";


// Reach out to API
function getApiWeather(city, unit) {
    // replace `octocat` with anyone else's GitHub username
    if (unit === true) {
        units = "metric";
    } else {units = "imperial"}

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  

    fetch(requestUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {


        console.log("all data")  
        console.log(data)
        cityInfo = data.city;
        timezone = cityInfo.timezone;

        currentHolder.innerHTML = ""
        holder.innerHTML = ""
        for (let i = 0; i < 40; i+=8) {
            if (i === 0) {
                buildMain(data.list[i])
                buildCard(data.list[i])
            } else {
            buildCard(data.list[i])
            }
        }
      });
  }
getApiWeather("Longmont",true)

let getCity = () => {
    let input = document.getElementById("newCity");
    let unit_metric = document.getElementById("unit").checked
    newCity = input.value;
    if (newCity === ""){
        window.alert("Please enter a city and try again")
        return
        }
    getApiWeather(newCity, unit_metric)
    //getApiForecast(newCity, unit_metric)
    console.log(unit_metric)
    console.log(newCity)
}

let result = () => {
    let unit_metric = document.getElementById("unit").checked;
}

// function to build forecast cards
let buildCard = (data) => {
    //create elements
    let card = document.createElement("div")
    let date = document.createElement("h4")
    let icon = document.createElement("img")
    let temp = document.createElement("p")
    let wind = document.createElement("p")
    let humidity = document.createElement("p")
    let desc = document.createElement("p")
    // card
    card.setAttribute("class","col card s2 card-panel blue lighten-4 center-align")
    // get & set info
    console.log(data)
        //Date
        let dateVar = (data.dt)*1000;
        let currDate = new Date(dateVar);
        let date_format = currDate.toLocaleString('en-US', options)
        date.textContent =`${date_format}`;
        // icon
        let weatherInfo = data.weather[0];
        let currIcon = weatherInfo.icon;
        icon.setAttribute("src",`http://openweathermap.org/img/w/${currIcon}.png`)
        //temp
        let main = data.main;
        let currTemp = Math.round(main.temp);
        temp.textContent = `Temperature: ${currTemp}`;
        //temp
        let windVar = data.wind;
        let currWindSpeed = Math.round(windVar.speed);
        let currWindDir = windDirection(windVar.deg);
        wind.textContent = `Wind: ${currWindSpeed} by ${currWindDir}`;
        //humidity
        let humidVar = Math.round(main.humidity);
        humidity.textContent = `Humidity: ${humidVar}%`;;
        //description 
        let currDesc = weatherInfo.main;
        desc.textContent = currDesc;
    // add to card
    card.append(date)
    card.append(icon)
    card.append(desc)
    card.append(temp)
    card.append(wind)
    card.append(humidity)

    holder.append(card)
}


//Current Main Card
let buildMain = (data) => {
        //create elements
        let card = document.createElement("div")
        let cityName = document.createElement("h2")
        let sunrise = document.createElement("p")
        let sunset = document.createElement("p")
        let date = document.createElement("h3")
        let icon = document.createElement("img")
        let temp = document.createElement("p")
        let wind = document.createElement("p")
        let humidity = document.createElement("p")
        let desc = document.createElement("p")
        // card
        card.setAttribute("class","main card-panel blue lighten-4")
        // get & set info
            // City info
            let city_Name = cityInfo.name;
            let sunriseTime = new Date(cityInfo.sunrise*1000);
            let sunsetTime = new Date(cityInfo.sunset*1000);
            let sunset_format = sunsetTime.toLocaleString('en-US', Timeoptions);
            let sunrise_format = sunriseTime.toLocaleString('en-US', Timeoptions);
            sunrise.textContent =`Sunrise: ${sunrise_format}`;
            sunset.textContent =`Sunset: ${sunset_format}`;
            cityName.textContent =`${city_Name}`;
            //Date
            let dateVar = (data.dt)*1000;
            let currDate = new Date(dateVar);
            let date_format = currDate.toLocaleString('en-US', options)
            date.textContent =`${date_format}`;
            // icon
            let weatherInfo = data.weather[0];
            let currIcon = weatherInfo.icon;
            icon.setAttribute("src",`http://openweathermap.org/img/w/${currIcon}.png`)
            //temp
            let main = data.main;
            let currTemp = Math.round(main.temp);
            temp.textContent = `Temperature: ${currTemp}`;
            //temp
            let windVar = data.wind;
            let currWindSpeed = Math.round(windVar.speed);
            let currWindDir = windDirection(windVar.deg);
            wind.textContent = `Wind: ${currWindSpeed} by ${currWindDir}`;
            //humidity
            let humidVar = Math.round(main.humidity);
            humidity.textContent = `Humidity: ${humidVar}%`;;
            //description 
            let currDesc = weatherInfo.main;
            desc.textContent = currDesc;
        // add to card
        card.append(cityName)
        card.append(sunrise)
        card.append(sunset)
        card.append(date)
        card.append(icon)
        card.append(desc)
        card.append(temp)
        card.append(wind)
        card.append(humidity)
    
        currentHolder.append(card)
}

// OnClick place query

// generate card for previous search and place below search bar

// get 5 days of weather info 

// make main section for today's weather

// make 5 cards for forecast

// wind direction
let windDirection = (num) => {
    let windArr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    if (num>=348.75)
        {return windArr[0];}
    return windArr[Math.round(num/22.5)]
}