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
	let currentCity = document.querySelector('.current__city')
	let currentRegion = document.querySelector('.current__region')
	let currentTime = document.querySelector('.current__time')
	let currentDay = document.querySelector('.current__day')
	let currentCondition = document.querySelector('.current__condition')
	let currentConditionImg = document.querySelector('.current__condition-img')
	let currentTemp = document.querySelector('.current__temp')
	console.log('logged data', data)

	currentCity.textContent = data.location.name
	currentRegion.textContent = data.location.country
	currentTime.textContent = data.location.localtime
	currentDay.textContent = data.location.localdate
	currentCondition.textContent = data.current.condition
	currentConditionImg.src = data.current.condition_icon
	currentTemp.textContent = `${data.current.temp}°C`
}

export { refreshDisplay }
