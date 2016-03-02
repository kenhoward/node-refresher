var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
  .get(function(req,res) {

    var quer = req.query;
    Book.find(function(err,books) {
      if(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API');
});

app.listen(port, function() {
  console.log('Listening to port ' + port);
})