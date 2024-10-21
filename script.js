const searchInput = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

const apiKey = 'a3985e737912abcbb5f8fde25fa0b720'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`

async function checkWeather(cityName) {
  const response = await fetch(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)

  if (response.status == 404) {
    document.querySelector('.error').style.visibility = 'visible'
  } else {
    var data = await response.json()

    document.querySelector('.city').innerHTML = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    document.querySelector('.temp span').innerHTML = Math.round(data.main.temp)
    document.querySelector('.humidity span').innerHTML = data.main.humidity
    document.querySelector('.wind span').innerHTML = data.wind.speed

    if (data.weather[0].main == 'Clouds') weatherIcon.src = 'images/clouds.png'
    else if (data.weather[0].main == 'Clear') weatherIcon.src = 'images/clear.png'
    else if (data.weather[0].main == 'Rain') weatherIcon.src = 'images/rain.png'
    else if (data.weather[0].main == 'Drizzle') weatherIcon.src = 'images/drizzle.png'
    else if (data.weather[0].main == 'Mist') weatherIcon.src = 'images/mist.png'
    else if (data.weather[0].main == 'Snow') weatherIcon.src = 'images/snow.png'

    document.querySelector('.weather').style.display = 'block'
    document.querySelector('.error').style.visibility = 'hidden'
  }
}

searchButton.addEventListener('click', () => {
  checkWeather(searchInput.value)
})
