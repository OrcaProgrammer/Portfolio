const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// App Configuration

app.engine('.hbs', engine({ 
    extname : '.hbs', defaultLayout : 'main', 
    helpers: {
        static: function(name) {
        return require('./static.js').map(name);
        }
    }
}));

app.set('port', process.env.PORT || 8000);
app.set('view engine', '.hbs');

// App middleware

app.use(express.static('public'));

// App Routes

app.get('/', function(req, res){
    var options = { title : 'Homepage'};
    res.render('home', options);
});

app.get('/rocket', function(req, res){
    var options = { title : 'Rocket Calculator'};
    res.render('rocket/rocket', options);
});

// custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Server running on http://127.0.0.1:' + app.get('port') + '; press CTRL + C to terminate');
});