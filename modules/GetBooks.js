const BookSchema = require("./BookSchema");

function getBooks(req, res) {
  const myEmail = req.query.name;
  console.log(myEmail);
  BookSchema.find({ email: myEmail }, function (err, bookData) {
    
    if (bookData.length == 0 || err) {
      res.status(404).send("cant find any books");
    } else {
      let bookArr = bookData.map((i) => {
        return new BooksMan(i);
      });
      res.status(200).send(bookArr);
    }
  });
}

class BooksMan {
  constructor(i) {
    this.id = i.id;
    this.title = i.title;
    this.description = i.description;
    this.status = i.status;
  }
}

module.exports = getBooks;
