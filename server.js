const 
	express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	routes = require("./routes"),
	path = require("path");

const 
	PORT = process.env.PORT || 3001,
	app = express();

// Configure to use body parser for AJAX requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add API Routes
app.use("/api", routes.api);
app.use("/scrape", routes.scrape);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytReact");

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
