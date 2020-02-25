const request = require("request")

const forecast = (lang, lng, lat, callback)=>{
  // make api call 
  request({
    url: `https://api.darksky.net/forecast/50b87a372cd3c9bbf3ca51c5ea94b6f4/${lat},${lng}?units=si&lang=${lang}`,
    json: true
  }, (err, {body}={})=>{
    if(err){
      callback("Unable to connect to the weather service")
    } else if (body.error){
      callback("Unable to find location weather. Try another search")
    } else {
      callback(undefined, body.daily.data[0].summary + `\nIt is currently ${body.currently.temperature} degrees out.\nThere is a ${body.currently.precipProbability}% chance of rain`)
    }
  })
}


module.exports = forecast