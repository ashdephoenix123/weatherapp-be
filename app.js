require("dotenv").config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {"origin": "https://sarkiweatherapp.vercel.app/"}
))
const port = process.env.PORT || 3000;

app.route("/")
    .get((req, res) => {
        res.send("hello")
    })
    .post(async (req, res) => {
        try {
            const city = req.body.city;
            const url = process.env.WEATHER_ENDPOINT + `?q=${city}&appid=` + process.env.WEATHER_APP_ID + "&units=" + process.env.WEATHER_UNIT;

            const response = await axios.get(url)
            const data = await response.data;

            return res.status(200).json(data)

        } catch (error) {
            res.json({cod: 404, message: "City not found"})
        }
    });


app.listen(port) 
