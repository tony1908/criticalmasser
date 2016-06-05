var scrap = require('newScrap')
var apisave = require('apisave')
var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var app = express();

scrap.execTime('http://www.cnet.com/rss/news/', 60, function(resultados,valorTemp, sta){//running the scrping every 60 minutes
	if (sta) {
		apisave.newRecord(resultados,function(status){
		if (status === 'ok') {
			console.log(status)
		}
	})
	}
})

app.get('/', function (req, res) {//the index shows you all the records in the db as json
	apisave.getAll(function(err, docs){
		if (err) {
			res.json({status:"error"})
		} else {
			console.log(docs)
			res.json(docs);
		}
	})
});

app.get('/query', jsonParser, function(req, res){//you can make some queries using this route
	apisave.queryRecords(req.query.q,function(err, docs){
		if (err) {
			res.json({status:"error"})
		} else {
			console.log(docs)
			res.json(docs);
		}
	})
})


var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});