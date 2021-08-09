"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const BookSchema = require("./modules/BookSchema");
const getBooks = require("./modules/GetBooks");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function seedBook() {
  const book1 = new BookSchema({
    title: "Crime in The city",
    description: "A thriller story about a young man",
    status: true,
    email: "osaid720720@gmail.com",
  });

  const book2 = new BookSchema({
    title: "The last wish",
    description: "Fantasy story about monsters killing witchers",
    status: true,
    email: "osaid720720@gmail.com",
  });

  const book3 = new BookSchema({
    title: "Treasure Island",
    description:
      "about a boy who has a treasure map and goes to an island to find the treasure",
    status: false,
    email: "osaid720720@gmail.com",
  });
  book1.save();
  book2.save();
  book3.save();
}

// seedBook()

// http://localhost3001/books
app.get("/books", getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// app.get('/test', (request, response) => {

//   // TODO:
//   // STEP 1: get the jwt from the headers
//   // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
//   // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
//   // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

// })
