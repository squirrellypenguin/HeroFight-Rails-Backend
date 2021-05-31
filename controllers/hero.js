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
const seedStore = require('../db/all');

// // SEED ROUTE
router.get('/seed', async (req,res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Hero.remove({});
    // add the seed data to the database
    await Hero.create(seedStore);
    // get full list of places to confirm seeding worked
    const heroes = await Hero.find({});
    // return full list of places as JSON
    res.json(heroes);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});
// INDEX ROUTE - returns all things

router.get("/", async (req, res) => {
    try {
    res.json(await Hero.find({}));
  }
  catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
  });

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


router.post("/", async (req, res) => {
    try {
      // pass the request body to create a new place in the database
      const newHero = await Hero.create(req.body);
      // send newly created place back as JSON
      res.json(newHero);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });

// // DELETE - remove a single thing
router.delete("/:id", async (req, res) => {
    res.json(await Hero.findByIdAndRemove(req.params.id));
  });
  

// // PUT - update a single thing
router.put('/:id', async (req, res) => {
	await Hero.findByIdAndUpdate(req.params.id, req.body, {new: true})
    const hero = await Hero.find({})
    res.json({
       
        data: hero
    });
});

//GET Route for partial search on name 

router.get("/search/:search", async (req, res) => {
    try {
    res.json(await Hero.find({ name: { $regex: req.params.search, $options: "i" } }));
  }
  catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
  });
// export router
module.exports = router;