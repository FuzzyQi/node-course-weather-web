const request = require("request")

const geocode = (address, callback)=>{
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2VqaS1kZXYiLCJhIjoiY2s0ZWExenhqMGFtcTNubGg1dTF4d2hraiJ9.Dn4MrHqgvg3xDKMh0anhDA&limit=1&language=es`

  request({url, json:true}, (err, {body}={})=>{
    if(err){
      callback("Unable to connect to location services", undefined)
    } else if (body.features.length === 0){
      callback("Unable to find location. Try another search")
    } else {
      callback(undefined, {
        lng: body.features[0].center[0],
        lat: body.features[0].center[1], 
        location: body.features[0].place_name
      })

    }
  })
}


module.exports = geocode