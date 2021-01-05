if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const { default: axios } = require('axios');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.static( __dirname + '/public'));

app.post('/weather', (req, res) => {
    console.log(req.body.q);
    var url = `http://api.weatherapi.com/v1/current.json`;
    axios({
        url: url,
        responseType: 'json',
        params: {
            key: `${WEATHER_API_KEY}`,
            q: `${req.body.q}`
        }
    }).then(data => res.json(data.data)).catch(err => {
        console.error(err);
    })
})

app.listen(3000,() => {
    console.log('Opened');
})