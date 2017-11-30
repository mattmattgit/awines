var mongoose = require('mongoose');

var Wine = mongoose.model('Wine', 
	  {
    "id": String,
    "name": String,
    "list": String,
    "position": 'number',
    "price": 'number',
    "dimension5": String
  });

module.exports = {Wine}