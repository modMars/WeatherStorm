import { apiCalls } from './api'

const form = document.querySelector('.weather-container__form')
form.addEventListener('submit', e => {
	e.preventDefault()
	const input = document.querySelector('#cityInput')
	apiCalls.fetchData(input.value)
	form.reset()
})
