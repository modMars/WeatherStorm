import { apiCalls } from './modules/api.js'
import {} from './modules/dom.js'
import './styles/normalize.css'
import './styles/style.css'

// function getLocation() {
// 	// Check if geolocation is supported by the browser
// 	if ('geolocation' in navigator) {
// 		// Prompt user for permission to access their location
// 		navigator.geolocation.getCurrentPosition(
// 			// Success callback function
// 			position => {
// 				// Get the user's latitude and longitude coordinates
// 				const lat = position.coords.latitude
// 				const lng = position.coords.longitude
// 				const output = `${lat},${lng}`
// 				// Do something with the location data, e.g. display on a map
// 				apiCalls.fetchData(output)
// 			},
// 			// Error callback function
// 			error => {
// 				// Handle errors, e.g. user denied location sharing permissions
// 				console.error('Error getting user location:', error)
// 			}
// 		)
// 	} else {
// 		// Geolocation is not supported by the browser
// 		console.error('Geolocation is not supported by this browser.')
// 	}
// }

// getLocation()

apiCalls.fetchData('New York')
