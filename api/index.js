require("dotenv").config() // load variables from .env
const express = require("express")
const registerMiddleware = require("./utils/middleware")
const { v4 } = require('uuid');

const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const corsOptions = require("./cors")

// Grab any ENV variables to be used, set default values in case .env file missing
const { PORT = 3000 } = process.env

// The Application Object
const app = express()

// registerMiddleware
registerMiddleware(app)

// Server listener
// app.listen(PORT, () => console.log(`listening on port ${PORT}`))



const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const corsOptions = require("./cors")
// import controllers
const HomeController = require("../controllers/HomeController")
const AuthController = require("../controllers/AuthController")
const TodoController = require("../controllers/TodoController")
// import models
const User = require("../models/user")
const Todo = require("../models/Todo")

// function to create context property in every request with shared data
const applicationContext = (req, res, next) => {
  // data to share can be added in this object
  req.context = {
    models: { User, Todo },
  }
  // move on to next middleware
  next()
}

const registerMiddleware = app => {
  app.use(cors(corsOptions)) // cors headers
  app.use(cookieParser()) // parse cookies
  app.use(express.json()) // parse json bodies
  app.use(morgan("tiny")) // logging
  app.use(applicationContext) // add context object to request
  app.use("/api", HomeController) // register homecontroller routes for  "/" urls
  app.use("/api/auth", AuthController) // register homecontroller routes for  "/auth" urls
  app.use("/api/todo", TodoController) // register todocontroller routes for  "/todo" urls
}

module.exports = app;
