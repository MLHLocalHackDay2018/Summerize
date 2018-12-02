const port = (process.env.PORT || 3001)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var summary = require('./summary.js');
var bodyParser = require('body-parser');
var azure = require('./azure.js');
var request = require('request');
var cheerio = require('cheerio');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/api/summarizeurl", (req, res) => {
	if(!req.body.url)
  		return res.send("[ERROR] Missing field 'url'");

  	var url = req.body.url;
  	requestPromise({
  		url: url
  	}).then(data => {
  		var $ = cheerio.load(data);
  		var num = 2;
		if(req.body.num && parseInt(req.body.num) >= 1)
			num = parseInt(req.body.num);

		summarize($("body").text().replace(/\s+/g, " "), num, (data) => {
			res.json(data);
		});
  	});
});

app.post("/api/summarize", (req, res) => {
  if(!req.body.text)
  	return res.send("[ERROR] Missing field 'text'");

  var text = req.body.text;
  var num = 2;
  if(req.body.num && parseInt(req.body.num) >= 1)
  	num = parseInt(req.body.num);

  summarize(text, num, (data) => {
  	res.json(data);
  })
});

function summarize(text, num, cb) {
	var response = {};
  	summary.summarize("", text, num, function(err, summary) {
	    response.summary = summary;
	    var body = JSON.stringify({
	  		"documents": [{
			    "language": "en",
			    "id": "1",
			    "text": text.substring(0, 4000) //max char limit in azure
			}]
		});
		var headers = {
			'Ocp-Apim-Subscription-Key': azure.key,
			'Content-type': 'application/json'
		}

	    var promises = [];
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/entities",
	    	headers: headers,
	  		body: body
	    }));
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",
	    	headers: headers,
	  		body: body
	    }));
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
	    	headers: headers,
	  		body: body
	    }));

	    Promise.all(promises).then(values => {
	    	console.log(JSON.parse(values[0]));
	    	response.entities = JSON.parse(values[0]).documents[0].entities;
	    	response.keyPhrases = JSON.parse(values[1]).documents[0].keyPhrases;
	    	response.sentiment = JSON.parse(values[2]).documents[0].score;

	    	cb(response);
	    });
  	});
}

function requestPromise(options) {
    return new Promise(function(resolve, reject){
        request.post(options, (err, resp, body) => {
            if (err) 
            	return reject(err);
            try {
                resolve(body);
            } 
            catch(e) {
                reject(e);
            }
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
