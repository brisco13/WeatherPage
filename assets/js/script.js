// get  variables
const apiKey = "bc2927d413afe0330a0f81aa8575c9c7";
let cityname = "denver";
let holder = document.getElementById("5Day")
let units = "imperial";
let newCity = "";
let timezone = 0;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


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
        let rightNow = data.list[0]
        console.log("got element")
        console.log(rightNow)
        let cityInfo = data.city;
        timezone = cityInfo.timezone;
        console.log("timezone: "+timezone)

        holder.innerHTML = ""
        for (let i = 0; i < 40; i+=8) {
            buildCard(data.list[i])
        }
        
      });
  }
getApiWeather("longmont", true)

let getCity = () => {
    let input = document.getElementById("newCity");
    let unit_metric = document.getElementById("unit").checked
    newCity = input.value;
    getApiWeather(newCity, unit_metric)
    //getApiForecast(newCity, unit_metric)
    console.log(unit_metric)
    console.log(newCity)
}

let result = () => {
    let unit_metric = document.getElementById("unit").checked
    console.log("checked: "+unit_metric)
}

// function to build a card
let buildCard = (data) => {
    
    //create elements
    let card = document.createElement("div")
    let date = document.createElement("h3")
    let icon = document.createElement("div")
    let temp = document.createElement("p")
    let wind = document.createElement("p")
    let humidity = document.createElement("p")
    let desc = document.createElement("p")
    // card
    card.setAttribute("class","card-panel teal")
    // get & set info
    console.log(data)
        //Date
        let dateVar = (data.dt)*1000;
        let currDate = new Date(dateVar);
        console.log("currDate: "+currDate+" var passed: "+ data.dt*1000)
        let date_format = currDate.toLocaleString('en-US', options)
        date.textContent =`${date_format}`;
        // icon
        let weatherInfo = data.weather[0];
        let currIcon = weatherInfo.icon;
        //icon = ???
        //temp
        let main = data.main;
        let currTemp = Math.round(main.temp);
        temp.textContent = `Temperature: ${currTemp}`;
        //temp
        let windVar = data.wind;
        let currWindSpeed = Math.round(windVar.speed);
        let currWindDir = windDirection(windVar.deg);
        wind.textContent = `Wind: ${currWindSpeed} in ${currWindDir} direction`;
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