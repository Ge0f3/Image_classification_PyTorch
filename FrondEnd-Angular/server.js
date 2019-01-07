// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const apiRoutes = require('./helpers/routes.js');

const app = express();

const PORT = process.env.PORT || 4200;

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Logging by Captn Morgan
app.use(morgan('dev'));



// Point static path to dist
app.use('/', express.static(path.join(__dirname, 'dist/udp-angular')));

//apiRoutes(app);

// Catch all other routes and return the index file
app.use('*', (req, res) => {
  //console.log(req);
  res.sendFile(path.join(__dirname, 'dist/udp-angular/index.html'));
});

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(PORT, () => console.log(`API running on localhost:` + PORT));
