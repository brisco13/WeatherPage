// get  variables
const apiKey = "bc2927d413afe0330a0f81aa8575c9c7";
let cityname = "denver";
let holder = document.getElementById("5Day")
let units = "imperial";
let newCity = "";
const options = { year: 'numeric', month: 'long', day: 'numeric' };
let currentHolder = document.getElementById("current");
let cityInfo = "";
let searchHolder = document.getElementById("pastSearches")
let initial = true;
let units_symbol = "°F"
let UV_var = "";

//demo call
//getApiWeather("Longmont",true)



// Reach out to API
function getApiWeather(city, unit) {
    // replace `octocat` with anyone else's GitHub username
    if (unit === true) {
        units = "metric";
        units_symbol = "°C"
    } else {
        units = "imperial"
        units_symbol = "°F"
    }

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  

    fetch(requestUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {


        console.log("all data")  
        console.log(data)
        cityInfo = data.city;
        let cityCoor =  cityInfo.coord
        cityLat = cityCoor.lat
        cityLon = cityCoor.lon
        var UVrequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily&appid=${apiKey}`;
        fetch(UVrequestUrl)
        .then(function (response) {
        return response.json()
        })
        .then(function (data1) {
            curr=data1.current
            UV_var=curr.uvi
            })


    .then(function () {    
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

    })
      });
  }


let getCity = () => {
    let input = document.getElementById("newCity");
    let unit_metric = document.getElementById("unit").checked
    newCity = input.value;
    if (newCity === ""){
        window.alert("Please enter a city and try again")
        return
        }
    getApiWeather(newCity, unit_metric)
    makeSearchCard(newCity)
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
    card.setAttribute("class","col card card-panel blue lighten-4 center-align")
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
        icon.setAttribute("class","float-right")
        //temp
        let main = data.main;
        let currTemp = Math.round(main.temp);
        temp.textContent = `Temperature: ${currTemp} ${units_symbol}`;
        //wind
        let windVar = data.wind;
        let currWindSpeed = Math.round(windVar.speed*2.23694);
        let currWindDir = windDirection(windVar.deg);
        wind.textContent = `Wind: ${currWindSpeed} MPH by ${currWindDir}`;
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
        let UV = document.createElement("p")
        let date = document.createElement("h3")
        let icon = document.createElement("img")
        let temp = document.createElement("p")
        let wind = document.createElement("p")
        let humidity = document.createElement("p")
        let desc = document.createElement("p")
        // card
        card.setAttribute("class","main card-panel")
        // get & set info
            // City info
            let city_Name = cityInfo.name;
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
            temp.textContent = `Temperature: ${currTemp}  ${units_symbol}`;
            //UVI
            let currUV = Math.round(UV_var);
            let UVcol = UVcolor(currUV)
            UV.textContent = `UV: ${currUV}`;
            //UV.setAttribute("style",`background-color: ${UVcol} font-weight:bold `)
            //wind
            let windVar = data.wind;
            let currWindSpeed = Math.round(windVar.speed*2.23694);
            let currWindDir = windDirection(windVar.deg);
            wind.textContent = `Wind: ${currWindSpeed} MPH by ${currWindDir}`;
            //humidity
            let humidVar = Math.round(main.humidity);
            humidity.textContent = `Humidity: ${humidVar}%`;;
            //description 
            let currDesc = weatherInfo.main;
            desc.textContent = currDesc;

            card.setAttribute("style",`background-color:${UVcol}`)
        // add to card
        card.append(cityName)
        card.append(date)
        card.append(UV)
        card.append(icon)
        card.append(desc)
        card.append(temp)
        card.append(wind)
        card.append(humidity)
        currentHolder.append(card)
}

// OnClick place query

// generate card for previous search and place below search bar
let makeSearchCard = (city) => {
    searchHolder.innerHTML=""
    let index = pastCities.indexOf(city);
    console.log(index)
    console.log(city)
    if (city !== undefined) {
        if (index>=0) {
            let tempVar = pastCities[index];
            console.log("tempVar: "+tempVar)
            console.log("PastCities: "+pastCities)
            pastCities.splice(index,1)
            pastCities.unshift(tempVar)
            console.log("PastCities: "+pastCities)
        } else {pastCities.unshift(city)}
        
    } 
    
    if (pastCities.length>=6) {
        pastCities.pop();
    } 
    pastCities.forEach(element => {
        //create elements
        let card = document.createElement("div");
        let p = document.createElement("p")
        let oldCity = element;
        // card
        card.setAttribute("class","card-panel blue lighten-4 center-align")
        card.setAttribute("id",oldCity)
        card.setAttribute("onClick","getApiWeather(this.id,units)")
        // set city
            p.textContent = oldCity;
        // add to card
        card.append(p)
        searchHolder.append(card)
    });

    localStorage.setItem("pastCities", JSON.stringify(pastCities))

    }
// get 5 days of weather info 

// make main section for today's weather

// Local strage
function checkCities() {
    if (localStorage.getItem("hasCities") != null) {
        pastCities = JSON.parse(localStorage.getItem("pastCities"));
        makeSearchCard();
    } else {
        localStorage.setItem("hasCities", true);
        pastCities = [];
        localStorage.setItem("pastCities", JSON.stringify(pastCities))  
        makeSearchCard();
    }    
}


function checkCityContents() {
    pastCities.forEach(element => {
        makeSearchCard(element)
    });
}

// wind direction
let windDirection = (num) => {
    let windArr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    if (num>=348.75)
        {return windArr[0];}
    return windArr[Math.round(num/22.5)]
}

// UV color
let UVcolor = (num) => {
    if (num<=2) {return "green";}
    if (num<=4) {return "yellow";}
    if (num<=6) {return "orange";}
    if (num<=8) {return "lightcoral";}
    if (num>8) {return "red";}
}

checkCities()