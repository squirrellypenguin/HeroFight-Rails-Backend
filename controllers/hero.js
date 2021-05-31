// import express
const express = require('express');
// instantiate a new instance of express.Router
const router = express.Router();
// import the 'fruits' model
// import the db connection
const mongoose = require('../db/connection');
const db = mongoose.connection;
// import the Fruit model
const Hero = require('../models/hero');
const allHeroes = require('../db/all');

// // SEED ROUTE
router.get('/seed', async (req,res) => {
    Hero.deleteMany({}).then(() => {
	Hero.insertMany(allHeroes).then((heroes) => {
		console.log('our fighters', heroes);
		db.close();
	});
});
})

// INDEX ROUTE - returns all things

    router.get('/', async (req, res) => {
	const heroes = await Hero.find({})
    res.json({
              data: heroes

    })
})


// // SHOW - returns a single thing
router.get('/:slug', async (req, res) => {
    console.log(res)
   const hero = await Hero.findOne({slug: (req.params.slug)})
    res.json({
        status: 200,
        data: hero
    })
});

// // CREATE- create a single thing
// // app.use(express.json()) => RAW - JSON
// // app.use(express.urlencoded({extended:false})) - x-www-form-urlencoded
router.post('/', async (req, res) => {
	await Hero.create(req.body)
    const hero = await Hero.find({})
    res.json({
       data: hero
    });
});

// // DELETE - remove a single thing
router.delete('/:id', async (req, res) => {
	await Hero.findByIdAndDelete(req.params.id)
    const hero = await Hero.find({})
    res.json({
         data: hero
        
    });
});

// // PUT - update a single thing
router.put('/:id', async (req, res) => {
	await Hero.findByIdAndUpdate(req.params.id, req.body, {new: true})
    const hero = await Hero.find({})
    res.json({
       
        data: hero
    });
});

// export router
module.exports = router;