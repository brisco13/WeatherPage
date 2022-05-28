// get  variables
const apiKey = "bc2927d413afe0330a0f81aa8575c9c7";
let cityname = "denver";
let forecast = document.getElementById("5Day")
let units = "imperial";


// Reach out to API
function getApi(city, unit) {
    // replace `octocat` with anyone else's GitHub username
    if (unit === true) {
        units = "metric";
    } else {units = "imperial"}

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  

    fetch(requestUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
          console.log(data)
          let cityName = data.name
            console.log(`City Name: ${cityName}`);
          let weatherInfo = data.weather[0];
          let weatherdisplay = JSON.stringify(weatherInfo)
            console.log(`WeatherInfo: ${weatherdisplay}`)
          let currDesc = weatherInfo.description
            console.log(`Description: ${currDesc}`)
          weatherInfo = data.main;
          weatherdisplay = JSON.stringify(weatherInfo)
            console.log(`WeatherInfo: ${weatherdisplay}`)
            let currTemp = weatherInfo.temp;
            console.log(currTemp)
      });
  }
getApi("longmont", true)

let getCity = () => {
    let input = document.getElementById("newCity");
    let unit_metric = document.getElementById("unit").checked
    let newCity = input.value;
    getApi(newCity, unit_metric)
    console.log(unit_metric)
    console.log(newCity)
}

let result = () => {
    let unit_metric = document.getElementById("unit").checked
    console.log("checked: "+unit_metric)
}

// OnClick place query

// generate card for previous search and place below search bar

// get 5 days of weather info 

// make main section for today's weather

// make 5 cards for forecast