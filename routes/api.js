const router = require("express").Router();
const nytCtrl = require("../controllers/nytController");

router.route("/")
	.get(nytCtrl.findAllSaved);

router.route("/article/:id")
	.put(nytCtrl.editComment)
	.delete(nytCtrl.unsave);

router.route("/scrape/search")
	.post(nytCtrl.search);

router.route("/scrape/:link")
	.get(nytCtrl.save);

module.exports = router;