import moment from 'moment'
import { apiCalls } from './api'
import { getDay } from './misc'

const form = document.querySelector('form')
form.addEventListener('submit', e => {
	e.preventDefault()
	const input = document.querySelector('#city-input')
	apiCalls.fetchData(input.value)
	form.reset()
})

const refreshDisplay = data => {
	let section = document.querySelector('.third-section')
	let currentCity = document.querySelector('.current__city')
	let currentRegion = document.querySelector('.current__region')
	let currentTime = document.querySelector('.current__time')
	let currentDay = document.querySelector('.current__day')
	let currentCondition = document.querySelector('.current__condition')
	let currentConditionImg = document.querySelector('.current__condition-img')
	let currentTemp = document.querySelector('.current__temp')

	console.log('logged data', data)
	//
	currentCity.textContent = data.location.name
	currentRegion.textContent = data.location.country
	currentTime.textContent = data.location.localtime
	currentDay.textContent = data.location.localdate
	currentCondition.textContent = data.current.condition
	currentConditionImg.src = data.current.condition_icon
	currentTemp.textContent = `${data.current.temp}°C`

	while (section.lastChild) {
		section.removeChild(section.lastChild)
	}
	data.forecast.forEach(day => {
		let forecastItem = document.createElement('div')
		forecastItem.setAttribute('class', 'forecast-item')

		let forecastCondition = document.createElement('h3')
		forecastCondition.setAttribute('class', 'forecast-item__condition')
		let forecastConditionIcon = document.createElement('img')
		let forecastLocalDate = document.createElement('h3')
		forecastLocalDate.setAttribute('class', 'forecast-item__localdate')
		let forecastMaxTemp = document.createElement('h3')
		let forecastMinTemp = document.createElement('h3')
		forecastCondition.textContent = day.condition
		forecastConditionIcon.src = day.condition_icon
		forecastLocalDate.textContent = day.localdate
		forecastMaxTemp.textContent = day.maxtemp
		forecastMinTemp.textContent = day.mintemp
		let tempWrapper = document.createElement('div')
		tempWrapper.setAttribute('class', 'forecast__temp-wrapper')
		tempWrapper.append(forecastMinTemp, forecastMaxTemp)
		forecastItem.append(forecastLocalDate, forecastCondition, forecastConditionIcon, tempWrapper)
		section.append(forecastItem)
	})
}

export { refreshDisplay }
