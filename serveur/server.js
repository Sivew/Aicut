const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require("cors");
const { QueryTypes } = require('sequelize');
const nocache = require('nocache');

const app = express();
const passport = require("passport");

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// passeport initalize
app.use(passport.initialize());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Serveur AICUT lancé" });
});

const db = require("./app/models");
const Role = db.role;

Role.create({
  id: 1,
  name: "user"
}).catch(function (err) {
  // handle role error;
});

Role.create({
  id: 2,
  name: "moderator"
}).catch(function (err) {
  // handle role error;
});

Role.create({
  id: 3,
  name: "admin"
}).catch(function (err) {
  // handle role error;
});

Role.create({
  id: 4,
  name: "streamer"
}).catch(function (err) {
  // handle role error;
});


db.sequelize.sync();

// passeport
require('./app/passport/twitch')(passport);
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/twitch.routes')(app, passport);
require('./app/routes/user.routes')(app);
require('./app/routes/api/trend_api.routes')(app);
require('./app/routes/api/create_clip.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});