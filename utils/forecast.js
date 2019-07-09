const request = require('request')

// ** This is a function definition
const forecast = (latitude, longitude,callback) => {

    // URL
    const url = 'https://api.darksky.net/forecast/9cfb32de0da99c1ebc5eb2cde71b311e/'+latitude+','+longitude+'?units=si'

    // Call to 'request API' passing in URL
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location, Try again',undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast