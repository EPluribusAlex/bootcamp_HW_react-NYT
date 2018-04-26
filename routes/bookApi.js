const router = require("express").Router();
const booksController = require("../controllers/booksController")

// Matches with "/api/books" (check server.js line 19)
router.route("/")
  .get(booksController.findAll) // get all bokks
  .post(booksController.create) // create a book

router.route("/:id")
  .get(booksController.findById) // get a book by id
  .put(booksController.update) // update a book by id
  .delete(booksController.delete) // delete a book by id

module.exports = router;
