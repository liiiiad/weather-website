const request = require('request')

const forecast = (lat,long,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=7a24a40c79ee327a93fde854d8355546&query='+ lat + ',' + long


    request({ url , json: true }, (error, {body}) => {

        if (error){
            callback('Unable to connect to the weather service:(',undefined)
        }
        else if(body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees. there is ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast