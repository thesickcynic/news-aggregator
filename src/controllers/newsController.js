const newsRoute = require('express').Router();
const verifyToken = require('../middleware/authorizeJWT')
const Validator = require('../utils/userInfoValidator');
const getNews = require('../utils/newsAPIHelper')
const bodyParser = require('body-parser');
const URLSearchparams = require('url-search-params');

const _news_API_URL = 'https://newsapi.org/v2/top-headlines'

newsRoute.get('/news', verifyToken, (req, res) => {
    if(!req._id && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
        })
    } else if (!req._id && req.message) {
        res.status(403).send({
            message: req.message
          });
    } else {
        const loggedInUser = userDatabase[req._id];
        // console.log(loggedInUser);
        const request_country = loggedInUser.preferred_country;
        const request_topic = loggedInUser.preferred_topic;
        const searchParams = new URLSearchparams({
            country: request_country,
            category: request_topic,
            apiKey: process.env.NEWS_API_KEY
        })
        getNews(_news_API_URL + '?' + searchParams).then( resp => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(resp);
          }).catch(err => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: err });
          });


    }
});

module.exports = newsRoute;
