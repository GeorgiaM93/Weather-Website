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
        })
}

function getCuurentWeatherData(lat, lon, city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            //getCuurentWeatherData(data[0].lat, data[0].lon);

            var h1 = $("<h1>");
            h1.text(`${city} (${moment().format('M/D/YYYY')})`);

            var temp = $("<p>"); //need to carry on from here and do same thing with humidity etc but when the tutor will send the one that works
            temp.text(`Temp: ${data.weather[0].main.temp}`);
            $("#today").append(h1, temp);
        })
}
