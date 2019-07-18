var express = require("express");
var router = express.Router();
var product = require("../models/product");

const auth = require("../auth");

router.get("/", auth.authentificate, async (req, res, next) => {
  product
    .find({})
    .then(data => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    })
    .catch(err => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");

      console.log(err);
    });
});

router.post("/add", auth.authentificate, (req, res, next) => {
  let Product = new product();
  Product._id = req.body._id;
  Product.name = req.body.name;
  Product.type = req.body.type;
  Product.price = req.body.price;
  Product.rating = req.body.rating;
  Product.warranty_years = req.body.warranty_years;
  Product.available = req.body.available;
  console.log("product add");
  console.log(Product);
  Product.save(err => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");
      console.log(err);
      return;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("product added");
    }
  });
});

router.post("/edit/:id", auth.authentificate, (req, res) => {
  let Product = {};
  let query = { _id: req.params.id };
  Product.name = req.body.name;
  Product.type = req.body.type;
  Product.price = req.body.price;
  Product.rating = req.body.rating;
  Product.warranty_years = req.body.warranty_years;
  Product.available = req.body.available;

  product.update(query, Product, err => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");
      console.log(err);
      return;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("product modified");
    }
  });
});

router.post("/delete/:id", auth.authentificate, (req, res, next) => {
  let query = { _id: req.params.id };
  product.remove(query, err => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("product deleted");
    }
  });
});

module.exports = router;
