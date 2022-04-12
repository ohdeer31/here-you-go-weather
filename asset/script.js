console.log(cityInputHere);
var searchedCity = [];
var searchedCityBtn = document.querySelector("#searchHistory");
var now = moment().format("l");
var day2 = moment().add(1, 'days').endOf('day').format("l");
var day3 = moment().add(2, 'days').endOf('day').format("l");
var day4 = moment().add(3, 'days').endOf('day').format("l");
var day5 = moment().add(4, 'days').endOf('day').format("l");
var day6 = moment().add(5, 'days').endOf('day').format("l");

var getGeoNum = function (city) {
    var inputString = $("#cityInputHere").val();
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=214eb128431cc12c0daea5af80ed6d50";
    
    fetch(geoApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.toFixed(2) + "&lon=" + lon.toFixed(2) + "&exclude=hourly,minutely,alerts&appid=214eb128431cc12c0daea5af80ed6d50"
        fetch(weatherApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.getElementById("dizCards").classList.remove("hidden");
            $("#currentUvi").empty();
            $(".dailyIcon").empty();
            $(".dailyTemp").empty();
            $(".dailyWind").empty();
            $(".dailyHumidity").empty();
            $("#card-header2").text(day2);
            $("#card-header3").text(day3);
            $("#card-header4").text(day4);
            $("#card-header5").text(day5);
            $("#card-header6").text(day6);

            for (var i = 0; i <= 5; i = i + 1) {
                dailyIcon = data.daily[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + dailyIcon + ".png";
                document.getElementsByClassName("dailyIcon")[i].setAttribute("src", iconurl);

                var kal = data.daily[i].temp.day;
                var fah = (kal - 273.15) * 1.8 + 32;
                dailyTemp = "Temp: " + fah.toFixed(1) + " °F";
                document.getElementsByClassName("dailyTemp")[i].append(dailyTemp);

                dailyWind = "Wind: " + data.daily[i].wind_speed + " MPH";
                document.getElementsByClassName("dailyWind")[i].append(dailyWind);
                
                dailyHumidity = "Humidity: " + data.daily[i].humidity + "%";
                document.getElementsByClassName("dailyHumidity")[i].append(dailyHumidity);
            }
            currentUvi = "UV Index: " + data.current.uvi;
            document.getElementById("currentUvi").append(currentUvi);
        })
    })
}

$("#submitBtn").click(function() {
    var inputString = $("#cityInputHere").val();
    if (inputString === "") {
        return;
    }
    if (!searchedCity.includes(inputString)) {
        searchedCity.push(inputString);
        renderCityName();
    }
    $("#cityName").empty();
    city = inputString.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) + "  " + now;
    document.getElementById("cityName").append(city);
    getGeoNum(inputString);
    storeCities();
    renderCityName();
});

function storeCities() {
    localStorage.setItem("cityNameSearch", JSON.stringify(searchedCity));
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cityNameSearch"));
    if (storedCities) {
        searchedCity = storedCities;
    }
    storeCities();
    renderCityName();
}

function renderCityName() {
    searchedCityBtn.innerHTML = "";

    for (var i = searchedCity.length - 1; i >= 0; i--) {
        
        var cityBtn = document.createElement("button");
        cityBtn.classList.add("myCityBtn");
        cityBtn.textContent = searchedCity[i];
        document.getElementById("searchHistory").appendChild(cityBtn);
    }
}

searchedCityBtn.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches(".myCityBtn") === true) {
        var city = element.textContent;
        getGeoNum(city);
        $("#cityName").empty();
        city = city.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) + "  " + now;
        document.getElementById("cityName").append(city);
    }
})

init();