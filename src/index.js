import { apiCalls } from './modules/api.js'
import {} from './modules/dom.js'
import './styles/normalize.css'
import './styles/style.css'

//Add form event listener
const form = document.querySelector('form')
form.addEventListener('submit', e => {
	e.preventDefault()
	const input = document.querySelector('#city-input')
	apiCalls.fetchData(input.value)
	form.reset()
})

//Call a default city's info
apiCalls.fetchData('New York')
