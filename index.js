//import express
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

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

//THIS IS THE WRONG WAY TO UPDATE!
//update data. using an id, update its destination, location, url, and description
// app.put("/destination/:id/:destination/:location/:url/:description", (req, res) => {

//       const { id, destination, location, url, description } = req.params

//       //look for the id in the array using a loop
//       for (let i = 0; i < list.length; i++) {
//             const listItem = list[i]
//             if (listItem.id == id) {
//                   //i wonder if i can deconstructure this
//                   listItem.destination = destination;
//                   listItem.location = location;
//                   listItem.url = url;
//                   listItem.description = description;
//                   //so we dont keep looking at the array because
//                   //we can only modify one at a time. for now
//                   break;
//             }
//       }

//       res.send(`Item id:${id} is updated!`)
// })

//working on update on class
app.put("/destination/:id", (req, res) => {
      const { id } = req.params
      const { destination, location, url, description } = req.body

      if (!destination && !location && !url && !description) {
            return res.status(400).json({ error: "Must update at least one property" })
      }

      //trying the fancy loop
      for (let item of list) {

            if (item.id == id) {
                  //update given destination, locaiton, url, description
                  if (destination) item.destination = destination
                  if (location) item.location = location
                  if (url) item.url = url
                  if (description) item.description = description
                  //break out of the loop because we're only updating one
                  break
            }
      }

      res.send(`Item id:${id} is updated!`)

})


//how to make http/api request in node?