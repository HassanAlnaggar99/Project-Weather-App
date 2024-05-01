function loadJson(query="auto:ip") {
  return fetch(`https://api.weatherapi.com/v1/current.json?key=59797644f0624da2ac1211546242703&q=${query.trim().toLowerCase()}`)
  .then(response => response.json())
  .catch(err => console.log(err));
}

// loadJson("cairo").then(console.log);

let form = document.querySelector("form");
let input = document.querySelector("input");
form.onsubmit = function(event) {
  event.preventDefault();
  updateStats(input.value);
};

function updateStats(query) {
  loadJson(query).then(dataObject => {
    let h1 = document.querySelector("h1");
    h1.textContent = dataObject.location.name;

    let now = new Date(dataObject.location.localtime);
    let time = `${String(now.getHours() % 12).padStart(2, 0)}:${String(now.getMinutes()).padStart(2, 0)} ${now.getHours() < 12 ? "AM" : "PM"}`;
    document.querySelector(".leadingP .value").textContent = time;

    document.querySelector(".block-a > img").src = "https:" + dataObject.current.condition.icon;
    document.querySelector(".real_temp").textContent = dataObject.current.temp_c + "° C";
    document.querySelector(".feel_temp").textContent = `RealFeel ${dataObject.current.feelslike_c}° C`;
    document.querySelector(".weather_text").textContent = dataObject.current.condition.text;

    document.querySelector(".right li:nth-of-type(1) > span").textContent = dataObject.current.cloud + "%";
    document.querySelector(".right li:nth-of-type(2) > span").textContent = `${dataObject.current.wind_dir} ${dataObject.current.wind_kph} km/h`;
    document.querySelector(".right li:nth-of-type(3) > span").textContent = `${dataObject.current.gust_kph} km/h`;
    document.querySelector(".right li:nth-of-type(4) > span").textContent = dataObject.current.humidity + "%";
  });
}

updateStats();
