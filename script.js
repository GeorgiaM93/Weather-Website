var apiKey = '5934f86037b4a9a4b629ca145fe1f65c';



const searchForm = document.getElementById("search-button")
searchForm.addEventListener("click", function (event) {
    //console.log("submit", event)
    event.preventDefault();
    var city = $("#search-input").val();

    getCoordinates(city);

});

function getCoordinates(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&unit=imperial&limit=5&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            //console.log(data);
            getCuurentWeatherData(data[0].lat, data[0].lon, city);
            getFiveDaysForecast(data[0].lat, data[0].lon);
        })
}

function getCuurentWeatherData(lat, lon, city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);

            var h1 = $("<h1>");
            h1.text(`${city} (${moment().format('M/D/YYYY')})`);

            var temp = $("<p>");
            var wind = $("<p>");
            var humidity = $("<p>");
            temp.text(`Temp: ${data.main.temp}`);
            wind.text(`wind: ${data.wind.speed}`)
            humidity.text(`humidity: ${data.main.humidity}`)
            $("#today").append(h1, temp, wind, humidity);

        })
}
function getFiveDaysForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            var temp1 = data.list[5].main.temp
            var temp2 = data.list[13].main.temp
            var temp3 = data.list[21].main.temp
            var temp4 = data.list[29].main.temp
            var temp5 = data.list[37].main.temp
            var wind1 = data.list[5].wind.speed
            var wind2 = data.list[13].wind.speed
            var wind3 = data.list[21].wind.speed
            var wind4 = data.list[29].wind.speed
            var wind5 = data.list[37].wind.speed
            var humidity1 = data.list[5].main.humidity
            var humidity2 = data.list[13].main.humidity
            var humidity3 = data.list[21].main.humidity
            var humidity4 = data.list[29].main.humidity
            var humidity5 = data.list[37].main.humidity
            var heading1 = $("<h1>");
            heading1.text = data.list[5].dt_txt
            heading1.text = data.list[13].dt_txt
        })

}