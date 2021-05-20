//import express
const express = require("express")
const app = express()
const PORT = 3000

//import json so can access req.body
app.use(express.json())

//import functions and the database
const { generateID } = require("./functions")
let { list } = require("./database")

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
      const { id, destination, location, url, description } = req.body

      //add item to array as long as user input a valid destination and a location

      if (destination === "" || destination === undefined || location === "" || location === undefined) {
            return res.status(400).json({ error: "Must input a destination and location" })
      }
      list.push({
            id: generateID(),
            destination: destination,
            location: location,
            url: url,
            description: description
      })

      res.send(`Added to the list!`)
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

//update data. using an id, update its destination, location, url, and description
app.put("/destination/:id/:destination/:location/:url/:description", (req, res) => {

      const { id, destination, location, url, description } = req.params

      //look for the id in the array using a loop
      for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                  //i wonder if i can deconstructure this
                  list[i].destination = destination;
                  list[i].location = location;
                  list[i].url = url;
                  list[i].description = description;
                  //so we dont keep looking at the array because
                  //we can only modify one at a time. for now
                  break;
            }
      }

      res.send(`Item id:${id} is updated!`)
})