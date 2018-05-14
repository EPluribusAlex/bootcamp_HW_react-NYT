const router = require("express").Router();
const nytCtrl = require("../controllers/nytController");

router.route("/")
	.get(nytCtrl.findAllSaved);

router.route("/article/:id")
	.put(nytCtrl.editComment)
	.delete(nytCtrl.unsave);

router.route("/scrape/search")
	.post(nytCtrl.search);

router.route("/save")
	.post(nytCtrl.save);

module.exports = router;