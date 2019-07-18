const express = require("express");
const router = express.Router();
const account = require("../models/account");
const bcrypte = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, err) => {
  console.log(req.body);
  account
    .findOne({ email: req.body.email })
    .then(Object => {
      if (bcrypte.compareSync(req.body.password, Object.password)) {
        console.log("Bienvenue : " + Object.email);
        const token = jwt.sign({ email: Object.email }, "A1B2", {
          expiresIn: 1000000
        });
        res.status(200).json({ success: true, token: token });
      } else res.status(401).json("Mauvais password");
    })
    .catch(err => {
      res.status(401).json("check yout username or password");
    });
});

router.post("/register", (req, res, next) => {
  let Account = new account();
  Account.name = req.body.name;
  Account.password = bcrypte.hashSync(
    req.body.password,
    bcrypte.genSaltSync(11)
  );
  Account.email = req.body.email;

  Account.save(err => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");
      console.log(err);
      return;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("Account added");
    }
  });
});

router.get("/", async (req, res, next) => {
  account
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

module.exports = router;
