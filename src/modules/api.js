import moment from 'moment'
import { refreshDisplay } from './dom'
import { getDay } from './misc'
const apiKey = 'cec2ad28447846509e3210207232806'

const apiCalls = (() => {
	async function fetchData(city) {
		try {
			const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`, {
				mode: 'cors',
			})
			const data = await response.json()
			let processedData = processData(data)
			console.log(processedData)
			//

			//
			refreshDisplay(processedData)
		} catch (error) {
			console.error("Couldn't fetch data: ", error.name)
		}
	}
	return { fetchData }
})()

function processData(data) {
	let split = data.location.localtime.split(' ')
	let date = split[0]
	let time = split[1]
	let processedData = {
		location: {
			country: data.location.country,
			localtime: time,
			localdate: moment(date).format('dddd, LL'),
			name: data.location.name,
			region: data.location.region,
			tz_id: data.location.tz_id,
		},
		current: {
			temp: data.current.temp_c,
			feelslike: data.current.feelslike_c,
			humidity: data.current.humidity,
			wind_kph: data.current.wind_kph,
			wind_dir: data.current.wind_dir,
			condition: data.current.condition.text,
			condition_icon: data.current.condition.icon,
		},
		forecast: [],
	}
	let forecast = data.forecast.forecastday
	forecast.forEach(forecast => {
		processedData.forecast.push({
			localdate: moment(forecast.date).format('dddd, LL'),
			maxtemp: forecast.day.maxtemp_c,
			mintemp: forecast.day.mintemp_c,
			condition: forecast.day.condition.text,
			condition_icon: forecast.day.condition.icon,
		})
	})
	return processedData
}

export { apiCalls }
