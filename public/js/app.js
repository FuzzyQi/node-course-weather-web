const mainContent = document.querySelector(".main-content")
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

// Creating paragraphs for feedback 
const message = document.createElement("p")
const messageAux = document.createElement("p")
message.setAttribute("id", "message-1")
messageAux.setAttribute("id", "message-2")
mainContent.appendChild(message)
mainContent.appendChild(messageAux)


// Event listener for form
weatherForm.addEventListener("submit", (e)=>{
  e.preventDefault()
  console.log(search.value)
  getForecast(search.value)
})

const getForecast = async (address) =>{
  message.textContent = "Loading..."
  messageAux.textContent = ""
  const res = await fetch(`http://localhost:3000/weather?address=${address}`)
  const data = await res.json()
  if(data.error){
    console.log(data.error)
    message.textContent = data.error
  } else {
    console.log("location:", data.location)
    console.log("forecast:", data.forecast)
    message.textContent = data.location
    messageAux.textContent = data.forecast; 
  }
}