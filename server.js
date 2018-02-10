const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const articlesController = require("./controllers/articlescontroller");
const router = express.Router();
const db = require('./models');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/articles', articlesController.findAll)
	.post('/api/articles', articlesController.create);

app.delete('/api/articles/:id', articlesController.remove);

// app.get('/api/articles', (req, res) => {
// 	db.Article
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
// })

// app.get('/api/articles', (req, res) => {
// 	db.Article
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
// })
// const routes = () => {router
// 		.route('/api/articles/')
// 		.get(articlesController.findAll)
// 		.post(articlesController.create);
// 	}

// app.use(routes)


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

const PORT = process.env.PORT || 8080;

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact"
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	// console.log(path.join(__dirname, "../client/build/index.html"))
});
