let weather = {
    "apiKey": "d6eb9b7b0d03536cf5772a3787b1b8cc",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&appid="
            + this.apiKey + "&units=metric")
            .then((response) => response.json()
            ).then((data) => this.displayWeather(data))
            
    },
    displayWeather: function (data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temp, humidity } = data.main
        const { speed } = data.wind
        
        document.querySelector(".h2_city").innerText = "Weather in " + name
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".h2_status").innerText = description
        document.querySelector(".h2_degree").innerText = Math.floor(temp) + "°C"
        document.querySelector(".h2_humidity").innerText = "Humidity: " + humidity + "%"
        document.querySelector(".h2_wind").innerText = "Wind speed: "+ speed+ " km/h"
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')"

        window.localStorage.clear()
        localStorage.setItem('document.querySelector(".h2_city").innerText', name)
        localStorage.setItem('document.querySelector(".h2_degree").innerText', Math.floor(temp) + "°C")
        localStorage.setItem('document.querySelector(".icon").src', "http://openweathermap.org/img/wn/" + icon + ".png")
        localStorage.setItem('document.querySelector(".h2_humidity").innerText', "Humidity: " + humidity + "%")
        localStorage.setItem('document.querySelector(".h2_wind").innerText', "Wind speed: "+ speed+ " km/h")
    },
    search: function(){
        this.fetchWeather(document.querySelector(".cityInput").value)
    }
}
function myFunction(){
    let city = localStorage.getItem('document.querySelector(".h2_city").innerText')
    document.querySelector(".h2_city").innerText = city
    weather.fetchWeather(city)
}

document.querySelector("button").addEventListener("click", function(){
    weather.search()
})

document.querySelector(".cityInput").addEventListener("keyup", function (event){
    if(event.key =="Enter")
    {
        weather.search()
    }
})



