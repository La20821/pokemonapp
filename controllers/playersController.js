const express = require('express');
const player = require('../player');
const router = express.Router();

const Player = require("../models").Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;


//player Sign In/Log In Home Page
router.get('/', (req, res) => {
    res.render('player/index.ejs');
});

//Get SignUp Form
router.get('/signup', (req, res) => {
    res.render('player/signup.ejs');
});

//Get Login Form
router.get('/login', (req, res) => {
    res.render('player/login.ejs');
});

router.post('/login', (req, res) => {
    console.log("login")
    Player.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
        }
    }).then((foundPlayer) => {
        console.log(foundPlayer)
        res.redirect(`profile/${foundPlayer.id}`)
    });
});




//Allow player to see profile
// router.get('/profile/:id', (req, res) => {
//     Player.findByPk(req.params.id, {
//         include : [Team]
//     })
//     .then((foundPlayerProfile) => {
//         Team.findAll().then((allTeams) => {
//             res.render('player/profile.ejs', {
//                 player: foundPlayerProfile,
//                 teams: allTeams,
//             });
//         })
//     });
// });
//Show route?? 
router.get("/profile/:id", (req, res) => {
    Player.findByPk(req.params.id, {
      include: [{ model: Team }, { model: Pokemon }],
    }).then((singlePlayer) => {
      Team.findAll().then((allTeams) => {
        console.log(singlePlayer);
        res.render("player/profile.ejs", {
      player: singlePlayer,
      teams: allTeams,
        });
      });
    });
  });





// Takes player to user created page
router.post('/', (req, res) => {
    Player.create(req.body).then((newPlayer) => {
        res.redirect(`/player/profile/${newPlayer.id}`);
    })
});

// Edit/update player info
router.put("/profile/:id", (req, res) => {
    Player.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    }).then((updatedPlayer) => {
        res.redirect(`/player/profile/${req.params.id}`);
    });
});


// delete player profile
router.delete("/:id", (req, res) => {
    Player.destroy({ where: { id: req.params.id} }).then(() => {
        res.redirect("/player"); //redirect back to index route
    });
});

module.exports = router;