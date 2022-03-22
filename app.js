// Dependencies
// const { resolveSrv } = require('dns/promises');
const express = require('express');
const app = express();
const { createLogger, format, transports } = require('winston');

// Use environment-defined port or default to 3000
let port = process.env.PORT || 3000;

// Middle JSON handling for requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Route handling
app.get('/', function(req, res) {
    res.send("Hello World!");
    console. log("Main page requested");
    logger.log('info', 'Main page requested');
});

app.get('/test', function(req, res) {
    var param = req.query.username;
    console.log('Request made for ' + param);
    logger.log('info', 'Test page requested');
    res.send("Thank you for using our get service!");
});

app.post('/test', function(req, res) {
    console.log('Data received: ' + JSON.stringify(req.body));
    logger.log('info', 'Test POST sent');
    res.send('Post received.');
})

// Calculator function. No validation involved.
app.get('/calc', function(req, res) {
    var one = parseInt(req.query.one);
    var two = parseInt(req.query.two);
    var operator = req.query.operator;
    logger.log('info', 'Calculation requested: ' + one + ' ' + operator + ' ' + two);
    switch(operator) {
        case 'add':
            var result = one + two;
            res.send(one + " plus " + two + " is " + result);
            break;
        case 'subtract':
            var result = one - two;
            res.send(one + " minus " + two + " is " + result);
            break;
        case 'multiply':
            var result = one * two;
            res.send(one + " multiplied by " + two + " is " + result);
            break;
        case 'divide':
            var result = one / two;
            res.send(one + " divided by " + two + " is " + result);
            break;
        default:
            res.send("Sorry, there was an error.");
    }
});

// logging function
const logger = createLogger({
    transports: [
        new transports.File({ filename: 'logFile.log', level: 'info', format: format.combine(format.timestamp(), format.json()) })
    ]
})

// Set app to listen
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
    console.log("Web server started");
    logger.log('info', 'Web server started. Listening on port: ' + port)
});