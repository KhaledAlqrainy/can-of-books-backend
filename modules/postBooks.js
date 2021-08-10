const BookSchema = require("./BookSchema");

function postBooks(req, res) {
  const { email, title, description, status } = req.body;
  BookSchema.find(
    { email: email },
    (err,
    (resultBooks) => {
      if (resultBooks.length == 0 || err) {
        res.status(404).send("cant find any user");
      } else {
        const newObj = {
          title: title,
          description: description,
          status: status,
          email: email,
        };
        BookSchema.insert(newObj);
      }
    })
  );

  res.send("hello");
}

module.exports = postBooks;
