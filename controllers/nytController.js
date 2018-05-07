const 
	axios = require("axios"),
	cheerio = require("cheerio"),
	db = require("../models");

module.exports = {
	findAllSaved: function(req, res) {
		db.Article
			.find({})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	editComment: function(req, res) {
		db.Article
			.findByIdAndUpdate(req.params.id, {comment: req.body})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	unsave: function(req, res) {
		db.Article
			.remove({_id: req.params.id})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	search: function(req, res) {
		axios
			.get(`https://www.nytimes.com/search/${req.query.term}/best/${req.query.startDate}/${req.query.endDate}`)
			.then(page => {
				const $ = cheerio.load(page.data);
				$("li.SearchResults-item--3k02W").each((i, element) => {
					const result = {
						title: $(element).find("h4.Item-headline--3WqlT").text(),
						link: $(element).find().text(),
						summary: $(element).find("p..Item-summary--3nKWX").text()
					};
				});
				res.send("Results scraped");
			})
			.catch(err => res.json(err));
	},
	save: function(req, res) {
		axios
			.get(req.link)
			.then(page => {
				const $ = cheerio.load(page.data);
				const result = {
					title: $().find("h1.css-1i2h6mf").text(),
					author: $().find("a.css-1gkapse e1x1pwtg0").text(),
					date: $().find("time.css-bfo5aw").text(),
					link: $(html).attr("itemid"),
					comment: req.body
				};
				db.Article
					.create(result)
					.then(dbModel => console.log(dbModel))
					.catch(err => console.log(err));
				res.send("Article saved");
			})
			.catch(err => res.json(err));
	}
}