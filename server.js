const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const request = require('request');

app.set('view engine', 'ejs')



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


const apiKey = '69fc9691ad07031af6c4b9d57e3b61d8';

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again A' });
        } else {
            let weather = JSON.parse(body)
            console.log(weather)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again B' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})




app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})