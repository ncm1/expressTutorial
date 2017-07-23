var express = require('express');

var app = express();
//setting the engine to handlebars
var handlebars = require('express3-handlebars')
        .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//set the port number to 3000 or the supplied port
app.set('port', process.env.PORT || 3000);

//The static middleware allows you to designate one or more directories
//as containing static resources that are simply to be delivered
//to the client without any special handling.
app.use(express.static(__dirname + '/public'));
//define array containing "virtual fortunes"
var fortunes = [
"Conquer your fears or they will conquer you.", "Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.", "Whenever possible, keep it simple.",
];

app.get('/', function(req, res, next){
  res.render('home');
})

app.get('/about', function(req, res, next){
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {fortune: randomFortune});
})
//Custom 404 page not found error
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port'));
})
