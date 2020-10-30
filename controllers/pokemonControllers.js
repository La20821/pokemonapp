const express = require('express');
const router = express.Router();

const Pokemon = require('../models').Pokemon;

//This is homepage
router.get('/', (req, res) => {
    Pokemon.findAll().then((pokemon) => {
        res.render("index.ejs", {
            pokemon:pokemon
        })
    })
});

// router.get('/',(req, res) => {
//     res.send(pokemon)
// })


//connects new.ejs file
router.get('/new', (req, res) => {
    res.render('new.ejs') 
  });


  //Insert new Pokemon
router.post('/', (req, res) => {
    console.log("test")
    Pokemon.create(req.body).then((newPokemon) => {
        res.redirect('/pokemon');
    })    
});

//display 
router.get('/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
        res.render('show.ejs' , {
            pokemon:pokemon,
        });
    });
});

//Edit an existing pokemon
router.get('/:id/edit', (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
        res.render('edit.ejs', {
            pokemon:pokemon,
        });
    })
});

//delete single pokemon
router.delete('/:id' , (req, res) => {
    Pokemon.destroy({where: {id: req.params.id} }).then(() => {
        res.redirect('/pokemon');
    })
});


router.put('/:index', (req, res) => {
    pokemon[req.params.index] = req.body
    res.redirect('/pokemon');
});

module.exports = router;