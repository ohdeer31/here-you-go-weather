console.log(cityInputHere);
var now = moment().format("l");
var day2 = moment().add(1, 'days').endOf('day').format("l");
var day3 = moment().add(2, 'days').endOf('day').format("l");
var day4 = moment().add(3, 'days').endOf('day').format("l");
var day5 = moment().add(4, 'days').endOf('day').format("l");
var day6 = moment().add(5, 'days').endOf('day').format("l");

var getGeoNum = function (city) {
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
            console.log(data);
            
            for (var i = 0; i <= 5; i = i + 1) {
                dailyIcon = data.daily[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + dailyIcon + ".png";
                // $('.dailyIcon').attr('src', iconurl);
                document.getElementsByClassName("dailyIcon")[i].setAttribute("src", iconurl);

                // document.getElementsByClassName("dailyIcon")[i].append(dailyIcon);

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
    
    getGeoNum(inputString);
    
    // $(".dailyIcon").text("");
    
    // var cityName = document.createElement("h3");
    // var blank = "";
    // document.getElementById("cityName").append(blank);
    $("#cityName").empty();
    $("#currentUvi").empty();
    $(".dailyIcon").empty();
    $(".dailyTemp").empty();
    $(".dailyWind").empty();
    $(".dailyHumidity").empty();
    cityName = inputString.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) + "  " + now;
    document.getElementById("cityName").append(cityName);

    $("#card-header2").text(day2);
    $("#card-header3").text(day3);
    $("#card-header4").text(day4);
    $("#card-header5").text(day5);
    $("#card-header6").text(day6);

    // function renderLastCity() {
    //     var description = localStorage.getItem("cityNameSearched");
    //     if (description !== null) {
    //         inputString.textContent = description;
    //     }
    // }


    // localStorage.setItem("cityNameSearch", inputString);
    // var searchHistory = document.createElement("button");
    // searchHistory.textContent = inputString;
    // document.getElementById("searchHistory").appendChild(searchHistory);
    // searchHistory.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     var description = localStorage.getItem("cityNameSearch");
    //     if (description !== null) {
    //         getGeoNum(description);
    //     }
    // })


    // buttonEl09.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     var description = document.querySelector(".description09").value;
    //     localStorage.setItem("cityNameSearched", description);
    //     renderLastCity();
    // })

    
    if (!searchedCity.includes(inputString)) {
        searchedCity.push(inputString);
        localStorage.setItem("cityNameSearch", inputString);
    
        var searchHistory = document.createElement("button");
        searchHistory.textContent = inputString;
        document.getElementById("searchHistory").appendChild(searchHistory);
    
        var description = localStorage.getItem("cityNameSearch");
        searchHistory.addEventListener("click", function(event) {
            event.preventDefault();
            if (description !== null) {
                getGeoNum(description);
    
                $("#cityName").empty();
                $("#currentUvi").empty();
                $(".dailyIcon").empty();
                $(".dailyTemp").empty();
                $(".dailyWind").empty();
                $(".dailyHumidity").empty();
                cityName = inputString.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) + "  " + now;
                document.getElementById("cityName").append(cityName);
            }
        })
    }
    console.log(searchedCity);

});

var searchedCity = [];

// $("#submitBtn").click(function() {
//     var inputString = $("#cityInputHere").val();

//     localStorage.setItem("cityNameSearch", inputString);

//     var searchHistory = document.createElement("button");
//     searchHistory.textContent = inputString;
//     document.getElementById("searchHistory").appendChild(searchHistory);

//     var description = localStorage.getItem("cityNameSearch");
//     searchHistory.addEventListener("click", function(event) {
//         event.preventDefault();
//         if (description !== null) {
//             getGeoNum(description);

//             $("#cityName").empty();
//             $("#currentUvi").empty();
//             $(".dailyIcon").empty();
//             $(".dailyTemp").empty();
//             $(".dailyWind").empty();
//             $(".dailyHumidity").empty();
//             cityName = inputString.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) + "  " + now;
//             document.getElementById("cityName").append(cityName);
//         }
//     })
// });
