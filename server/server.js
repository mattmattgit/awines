const axios = require('axios');
const cheerio = require('cheerio');

var {mongoose} = require('./db/mongoose.js');
var {Wine} = require('./models/wine.js');

let urls = [];

for (let i = 0; i < 10; i++){
  let base_url = `https://www.aldi.co.uk/c/wines/All-Wines?q=%3Apopular&page=${i}`;
  urls.push(base_url);
}

let promises = [];

urls.forEach( (singleElement) => {
  myUrl = singleElement;
  promises.push(axios.get(myUrl).then( (response) => {
      let $ = cheerio.load(response.data);
      let data = [];
      $('.gtm-product-data').each( (i, elm) => {
        data.push(
          $(elm).text()
        );
      });
      return data
    }));
});

axios.all(promises).then((results) => {
	var output = []
  for(let i = 0; (results.length) > i; i++){
	for(let c = 0; (results[i].length) > c; c++){
	output.push(JSON.parse(results[i][c]));
	};
  };
  return output
}).then((results) => {
	// for(let i = 0; (results.length) > i; i++){
	// 	var newWine = new Wine(results[i])
	// 	newWine.save().then((r) => {
	// 		console.log('saved', i);
	// 	}, (e) => {
	// 		console.log('not saved', e);
	// });
	// }
	Wine.insertMany(results).then((err, res) => {
		if (err) {
			console.log(err);
		};
		console.log(res);
	})
});

