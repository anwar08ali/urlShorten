const express = require("express");
const app = express();
const shortid = require("shortid");

const cors = require("cors");
require("dotenv").config();
const port = process.env.port;
const bodyParser = require("body-parser"); //use to parse incoming request bodies
const isURL = require("./helper/helper");
const connectDB = require("./db");
connectDB();

const urlDb = require("./dbQueries/dbUrl");
const { async } = require("validate.js");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", async (req, res) => {
  return res.status(200).send("hello world!!!");
});
app.post("/genShortUrl", async (req, res) => {
  try {
    if (isURL(req.body.longUrl)) {
      const shortUrl = shortid.generate();
      const reslt = await urlDb.save(req.body.longUrl, shortUrl, 0);
      return res.status(200).send({ shortUrl: reslt.shortURL });
    } else {
      return res.status(400).send({ msg: "Invalid URL." });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error. Something went wrong..." });
  }
});
app.get("/getAllUrls", async (req, res) => {
  try {
    const urls = await urlDb.findAll();
    return urls
      ? res.status(200).send({ urls })
      : res.status(200).send({ urls: [] });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error. Something went wrong...");
  }
});
app.get("/:shortUrlId", async (req, res) => {
  try {
    const url = await urlDb.find(req.params.shortUrlId);
    if (!url) {
      return res.status(404).send("Not found");
    }
    url.clicks++;
    url.save();
    res.redirect(url.longURL);
  } catch (error) {
    return res.status(500).send("Error. Something went wrong...");
  }
});
//handling invalid routes
app.get("*", function (req, res) {
  res.status(404).send("Invalid route !!!");
});
app.listen(port, () => console.log("listening port " + port));
