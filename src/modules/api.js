const apiCalls = (() => {
	async function fetchData(city) {
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/forecast.json?key=cec2ad28447846509e3210207232806&q=${city}&days=7`,
				{ mode: 'cors' }
			)
			const data = await response.json()
			const processedData = processData(data)
			console.log(processedData)
		} catch (error) {
			console.error(error)
		}
	}
	return { fetchData }
})()

function processData(data) {
	const processedData = {
		location: {
			country: data.location.country,
			localtime: data.location.localtime,
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
	const forecast = data.forecast.forecastday
	forecast.forEach(forecast => {
		processedData.forecast.push({
			date: forecast.date,
			maxtemp: forecast.day.maxtemp_c,
			mintemp: forecast.day.mintemp_c,
			condition: forecast.day.condition.text,
			condition_icon: forecast.day.condition.icon,
		})
	})
	return processedData
}

export { apiCalls }
