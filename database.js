const { generateID } = require("./functions")

const list = [
      {
            id: generateID(),
            destination: "Space Needle",
            location: "Seattle",
            url: "https://images.unsplash.com/photo-1542223616-740d5dff7f56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80",
            description: "A building that looks like a needle"
      },
      {
            id: generateID(),
            destination: "Pike Place Market",
            location: "Seattle",
            url: "https://images.unsplash.com/photo-1604028938192-511d64967359?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=615&q=80",
            description: "A fish market in downtown Seattle"
      },
      {
            id: generateID(),
            destination: "Disneyland",
            location: "California",
            url: "https://images.unsplash.com/photo-1586877644127-e5ee9b4231c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            description: "A dream place for everybody"
      },
];


exports.list = list