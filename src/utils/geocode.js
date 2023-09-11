const request = require('request')

const geocode = (address, callback) => {
    const gcUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGR2amgiLCJhIjoiY2xtY2ZnNXNkMTJzczNkanJvYWE0b2ZiNiJ9.CzREQV5k-59s9XwTGBCDBQ&limit=1'
    
    request ({ url: gcUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service:(', undefined)
        }
        else if(body.features.length === 0) {
            callback('The place you entered does not exist :(', undefined)
        }
        else {
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode