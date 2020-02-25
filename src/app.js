const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Create footer partial 
// Setup a footer partial: Created by {some name}
// Use it at the bottom of our 3 pages


const app = express()

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


app.listen(3000, ()=>{
  console.log("Server is running on port 3000")
})


// Create & rednder 404 page
// Setup template to render header & footer 
// Setup page to render an error message in a p 
// Render template for both 4040 routes 
//  - Page not found 
//  - OR Help article not found 