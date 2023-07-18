import moment from 'moment'
import { apiCalls } from './api'

//Refresh the DOM elements when a new data response is recieved
const refreshDisplay = data => {
	let section = document.querySelector('.third-section')
	let currentCity = document.querySelector('.current__city')
	let currentRegion = document.querySelector('.current__region')
	let currentTime = document.querySelector('.current__time')
	let currentDay = document.querySelector('.current__day')
	let currentCondition = document.querySelector('.current__condition')
	let currentConditionImg = document.querySelector('.current__condition-img')
	let currentTemp = document.querySelector('.current__temp')
	//Set text content of elements equal to the each respective data entry
	currentCity.textContent = data.location.name
	currentRegion.textContent = data.location.country
	currentTime.textContent = data.location.localtime
	currentDay.textContent = data.location.localdate
	currentCondition.textContent = data.current.condition
	currentConditionImg.src = data.current.condition_icon
	currentTemp.textContent = `${data.current.temp}°C`
	//Remove children elements of the third section
	while (section.lastChild) {
		section.removeChild(section.lastChild)
	}
	//Create forecast cards and append them to the third section
	data.forecast.forEach((day, i) => {
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
		i == 0 ? (forecastLocalDate.textContent = 'Today') : (forecastLocalDate.textContent = day.localdate)
		forecastMaxTemp.textContent = `${day.maxtemp}°C`
		forecastMinTemp.textContent = `${day.mintemp}°C`
		let tempWrapper = document.createElement('div')
		tempWrapper.setAttribute('class', 'forecast__temp-wrapper')
		tempWrapper.append(forecastMinTemp, forecastMaxTemp)
		forecastItem.append(forecastLocalDate, forecastCondition, forecastConditionIcon, tempWrapper)
		section.append(forecastItem)
	})
}

//Show feedback on API promise errors
const errorPopup = error => {
	const input = document.querySelector('#city-input')
	if (error.name == 'TypeError') {
		input.placeholder = 'Unknown location'
		input.style.color = 'red'
		input.style.fontWeight = 'bolder'
		setTimeout(e => {
			input.placeholder = 'Location'
			input.style.color = 'black'
			input.style.fontWeight = '400'
		}, 2500)
	} else {
		input.placeholder = error.name
		input.style.color = 'red'
		input.style.fontWeight = 'bolder'
		setTimeout(e => {
			input.placeholder = 'Location'
			input.style.color = 'black'
			input.style.fontWeight = '400'
		}, 2500)
	}
}

export { errorPopup, refreshDisplay }
