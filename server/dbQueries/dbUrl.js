const Url = require("../models/url");
const save = (longURL, shortURL, clicks) => {
  return Url.create({ longURL, shortURL, clicks });
};
const find = (shortURL) => Url.findOne({ shortURL: shortURL });
const findAll = () => Url.find();

module.exports = {
  save,
  find,
  findAll,
};
