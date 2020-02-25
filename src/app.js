const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// Setup handlebars & views locatin
app.set("view engine", "hbs") // Setting a value for an express setting
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get("/", (req, res)=>{
  res.render("index", {
    title: "Weather App", 
    name: "Roboto Son"
  })
})

app.get("/about", (req, res)=>{
  res.render("about", {
    title: "About me",
    name: "Roboto Son"
  })
})

app.get("/help", (req, res)=>{
  res.render("help", {
    title: "Help Page",
    message: "This is a help message", 
    name: "Roboto Son"
  })
})



// Wire up weather route 
// Load in both geocode & forecast 
// Use the address to geocode 
// 


app.get("/weather", (req, res)=>{
  if (!req.query.address){
    return res.send({
      error: "Address must be provided",
    })
  }
  address = req.query.address

  // geocode the address
  geocode(address, (err, {lng, lat, location}={})=>{
    if (err){
      return res.send({
        error: err
      })
    }
    // get the forecast for that data 
    forecast("en", lng, lat, (err, summary)=>{
      if (err){
        return res.send({
          error: err
        })
      } 
      res.send({
        forecast: summary, 
        location, 
        address
      })
    
    })
    
  })
})



app.get("/products", (req, res)=>{
  if(!req.query.search){
    return res.send({
      error: "You must provide a search term"
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get("/help/*", (req, res)=>{
  res.render("404", {
    title: "404",
    name: "Roboto Son",
    errorMessage: "Help Article Not Found"
  })
})

app.get("*", (req, res)=>{
  res.render("404", {
    title: "404",
    name: "Roboto Son",
    errorMessage: "Page not Found"
  })
})


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)
})