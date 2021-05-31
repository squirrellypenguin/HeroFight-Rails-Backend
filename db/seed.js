const allHeroes = require('./all');
const mongoose = require('./connection');
const Hero = require('../models/hero');
const db = mongoose.connection;

Hero.deleteMany({}).then(() => {
	Hero.insertMany(allHeroes).then((heroes) => {
		console.log('our fighters', heroes);
		db.close();
	});
});