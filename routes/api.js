const router = require("express").Router();
const nytCtrl = require("../controllers/nytController");

router.route("/")
	.get(nytCtrl.findAllSaved);

router.route("/article/:id")
	.put(nytCtrl.editComment)
	.delete(nytCtrl.unsave);

router.route("/scrape")
	.get(nytCtrl.search)
	.post(nytCtrl.save);

module.exports = router;