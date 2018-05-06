const 
	axios = require("axios"),
	cheerio = require("cheerio"),
	db = require("../models");

module.exports = {
	findAll: function(req, res) {
		db.Article
			.find(req.query)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	findById: function(req, res) {
		db.Article
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	comment: function(req, res) {
		db.Article
			.findOneAndUpdate({_id: req.params.id}, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	scrape: function(req, res) {

		axios
			.get("https://www.nytimes.com/?action=click&pgtype=Homepage&module=MastheadLogo&region=TopBar")
			.then((page) => {

				const $ = cheerio.load(page.data);

				$("article").each((i, element) => {

					const result = {

					};

					if() {
						db.Article
							.create(result)
							.then((dbNewsArt) => console.log(dbNewsArt))
							.catch((err) => console.log(err));
					}

				});

				res.send("Articles scraped");

			})
			.catch((err) => {
				res.json(err);
				console.log(err);
			});

	}
}