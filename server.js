"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const BookSchema = require("./modules/BookSchema");
const getBooks = require("./modules/GetBooks");
// const postBooks = require("./modules/postBooks");

//////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function seedBook() {
  const book1 = new BookSchema({
    title: "Crime in The city",
    description: "A thriller story about a young man",
    status: true,
    email: "khaledalqrainy@gmail.com",
  });

  const book2 = new BookSchema({
    title: "The last wish",
    description: "Fantasy story about monsters killing witchers",
    status: true,
    email: "khaledalqrainy@gmail.com",
  });

  const book3 = new BookSchema({
    title: "Treasure Island",
    description:
      "about a boy who has a treasure map and goes to an island to find the treasure",
    status: false,
    email: "khaledalqrainy@gmail.com",
  });
  book1.save();
  book2.save();
  book3.save();
}

// seedBook()

// http://localhost:3001/books
app.get("/books", getBooks);

// http://localhost:3001/books
app.post("/books", postBooks);

app.delete("/books/:id", deleteBook);

async function deleteBook(req, res) {
  const id = req.params.id;
  const email = req.query.email;

  await BookSchema.deleteOne({ email: email, _id: id });

  BookSchema.find({ email: email }, (err, result) => {
    if (result.length == 0 || err) {
      res.status(404).send("cant find any user");
    } else {
      res.send(result);
    }
  });
}

function postBooks(req, res) {
  const { email, title, description, status } = req.body;
  BookSchema.find({ email: email }, (err, resultBooks) => {
    if (resultBooks.length == 0) {
      // res.status(404).send("cant find any user");
      const newObj = {
        title: title,
        description: description,
        status: status,
        email: email,
      };
      resultBooks.push(newObj);
      let bookArr = resultBooks.map((i) => {
        return new BooksManipulator(i);
      });
      res.send(bookArr);
      BookSchema.insertMany(newObj);
    } else {
      const newObj = {
        title: title,
        description: description,
        status: status,
        email: email,
      };
      resultBooks.push(newObj);
      let bookArr = resultBooks.map((i) => {
        return new BooksManipulator(i);
      });
      res.send(bookArr);
      BookSchema.insertMany(newObj);
    }
  });
}

class BooksManipulator {
  constructor(i) {
    this.title = i.title;
    this.description = i.description;
    this.status = i.status;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// app.get('/test', (request, response) => {

//   // TODO:
//   // STEP 1: get the jwt from the headers
//   // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
//   // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
//   // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

// })
