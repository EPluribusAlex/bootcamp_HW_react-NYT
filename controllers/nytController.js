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
			.findByIdAndUpdate(req.params.id, {comment: req.body.comment})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	unsave: function(req, res) {
		console.log(req.params.id);
		db.Article
			.remove({_id: req.params.id})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	search: function(req, res) {
		const queryURL = `https://www.nytimes.com/search/${req.body.query}/best/${req.body.startDate}/${req.body.endDate}`;
		axios
			.get(queryURL)
			.then(page => {
				const results = [];
				const $ = cheerio.load(page.data);
				$("li.SearchResults-item--3k02W").each((i, element) => {
					const result = {
						title: $(element).find("h4.Item-headline--3WqlT").text(),
						link: "https://www.nytimes.com" + $(element).find("a").attr("href"),
						summary: $(element).find("p.Item-summary--3nKWX").text()
					};
					results.push(result);
				});
				res.json(results);
			})
			.catch(err => res.json(err));
		console.log(queryURL, "URL");
	},
	save: function(req, res) {
		// console.log(req.body.link, "article link");
		// axios
		// 	.get(req.body.link)
		// 	.then(page => {
		// 		const $ = cheerio.load(page.data);
		// 		const result = {
		// 				title: $("body").find(".css-1i2h6mf").text(),
		// 				author: $("body").find(".css-1gkapse e1x1pwtg0").text(),
		// 				date: $("body").find(".css-bfo5aw").text(),
		// 				link: $("html").attr("itemid"),
		// 				comment: ""//req.body.comment
		// 		};
		// 		console.log(result);
		// 		store(result);
		// 	})
		// 	.catch(err => res.json(err));
		console.log(req.body);
		db.Article
			.create(req.body)
			.then(dbModel => console.log(dbModel))
			.catch(err => console.log(err));
		res.send("Article saved");
	}
};