var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },

  name: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  warranty_years: {
    type: Number,
    required: false
  },
  available: {
    type: Boolean,
    required: false
  }
});
var product = mongoose.model("Product", productSchema);
module.exports = product;
