//import express
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

//import cors so no error in browswer
const cors = require("cors")

//require the dotenv
require('dotenv').config()

//import json so can access req.body
app.use(express.json())
app.use(cors())

//import functions and the database
const { generateID } = require("./functions")
let { list } = require("./database")

//import fetch function
const fetch = require("node-fetch")
const axios = require("axios")

//listen
app.listen(PORT, () => {
      console.log(`Server started. Listening on port ${PORT}`)
})

//GET. show the current database
app.get("/destinations", (req, res) => {
      res.send(list)
})

//add data
app.post("/destination", (req, res) => {
      const { id, destination, location, description } = req.body

      if (destination === "" || destination === undefined || location === "" || location === undefined) {
            return res.status(400).json({ error: "Must input a destination and location" })
      }

      //add item to array as long as user input a valid destination and a location
      const url = `https://api.unsplash.com/search/photos?client_id=${process.env.idKey}&query=${destination} ${location}`;


      //the node-fetch way
      // fetch(url).then((response) => response.json()).then((picture) => {

      //       let array = picture.results

      //       const randomIndex = (Math.floor(Math.random() * array.length))
      //       const randomPhotoUrl = array[randomIndex].urls.regular

      //       list.push({
      //             id: generateID(),
      //             destination: destination,
      //             location: location,
      //             url: randomPhotoUrl,
      //             description: description
      //       })

      //       res.send(`Added to the list!`)
      // })

      //the axios way
      //axios.get(url).then((picture) => {
      //picture.data
      axios.get(url).then(({ data }) => {

            let array = data.results
            const randomIndex = (Math.floor(Math.random() * array.length))
            const randomPhotoUrl = array[randomIndex].urls.regular

            list.push({
                  id: generateID(),
                  destination: destination,
                  location: location,
                  url: randomPhotoUrl,
                  description: description
            })

            res.send(`Added to the list!`)
      })

})

//delete data using an id
app.delete("/destination/:id", (req, res) => {
      const { id } = req.params

      let newArray = []

      //loop through the list, if the id is same, remove that from the list
      for (let i = 0; i < list.length; i++) {
            if (list[i].id !== id) {
                  newArray.push(list[i])
            }
      }

      list = newArray;

      res.send(`Item id:${id} is deleted`)
})

//working on update on class
app.put("/destination/:id", (req, res) => {
      const { id } = req.params
      const { destination, location, description } = req.body

      if (!destination && !location && !description) {
            return res.status(400).json({ error: "Must update at least one property" })
      }

      const url = `https://api.unsplash.com/search/photos?client_id=${process.env.idKey}&query=${destination} ${location}`;

      axios.get(url).then((picture) => {

            let array = picture.data.results

            const randomIndex = Math.floor(Math.random() * array.length)
            const randomImage = array[randomIndex].urls.regular

            //trying the fancy loop
            for (let item of list) {

                  if (item.id == id) {
                        //update given destination, locaiton, url, description
                        if (destination) item.destination = destination
                        if (location) item.location = location
                        if (url) item.url = randomImage
                        if (description) item.description = description
                        //break out of the loop because we're only updating one
                        break
                  }
            }

            res.send(`Item id:${id} is updated!`)
      })



})


//how to make http/api request in node?