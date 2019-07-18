const express = require("express");
const jwt = require("jsonwebtoken");

module.exports.authentificate = (req, res, next) => {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization;
    console.log(token);
    console.log("req: " + req.headers.authorization);
    jwt.verify(token, "A1B2", (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json("token expired");
      } else {
        req.user = decoded.userName;
        console.log(decoded.userName);
        next();
      }
    });
  } else {
    res.status(403).json("No Token provided");
  }
};
