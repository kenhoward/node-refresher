var express = require('express');
var mongoose = require('mongoose');
//Using Body Parser for our POST requests
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

//Telling bodyParser what we need it to: JSONify the content
app.use(bodyParser.json());
//Helps with encoding
app.use(bodyParser.urlencoded({ extended: true }));

var bookRouter = express.Router();

bookRouter.route('/Books')
  .post(function(req,res) {
    var book = new Book(req.body);
    console.log(book)
    res.send(book);
  })
  .get(function(req,res) {
    //Adding a filtering option [Module: 2 - Getting Data]
    var query = {};

    if(req.query.genre) {
      query.genre = req.query.genre; //Only allows us to filter on that one piece
    }
    Book.find(query, function(err,books) {
      if(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  });

//Utilizing ID to return single item [Module: 2 - Getting a Single Item]
bookRouter.route('/Books/:bookId')
  .get(function(req,res) {
    //Adding a filtering option [Module: 2 - Getting Data]
    var query = {};

    if(req.query.genre) {
      query.genre = req.query.genre; //Only allows us to filter on that one piece
    }
    Book.findById(req.params.bookId, function(err,book) {
      if(err)
        res.status(500).send(err);
      else
        res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API');
});

app.listen(port, function() {
  console.log('Listening to port ' + port);
})
