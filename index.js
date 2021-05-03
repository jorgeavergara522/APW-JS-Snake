// Jorge

const express = require('express')
const session = require('express-session')
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));


var path = require('path');
const port = process.env.PORT || 5000;

// Jeff

app.use("/api/users", users);
 //app.use(session({
   //secret  : 'oa7wHOKBTr',
   //resave  : false,
   //saveUninitialized  : false,
   //cookie  : { maxAge:60000 }
  //}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));

app.get('/',function (req, res) {
    res.render('pages/home', {user: {}})
});

// Devon, Jorge

app.get('/login',function (req, res) {
  res.render('pages/login', {user: {}})
});

app.get('/highScores', async function (req, res) {
  const players = await User.find({})

 const data = players.map(player => {
   let score = player.highscore || "0"

   return {handle: player.handle, highscore: score }
 })

  const newdata = data.sort((a,b) => a.score + b.score)

  res.render('pages/highScores', {users: newdata});
});

// Jeff, Mike

app.get('/signup',function (req, res) {
  res.render('pages/signup',{user: {}})
});

app.get('/game',function (req, res) {
  res.render('pages/game',{user: {}})
});

// Jeff, Mike, Devon, Jorge 

app.get('/logout', function (req, res)
{ req.logout();
  res.render('pages/home', {user: {}});
});

app.get('/save', async function (req, res)
{
  const players = await User.find({})

 const data = players.map(player => {
   let score = player.highscore || "0"

   return {handle: player.handle, highscore: score }
 })

  const newdata = data.sort((a,b) => a.score + b.score)

  res.render('pages/highScores', {users: newdata});
});

app.post('/save', async function(req, res)
{
  
  res.render('pages/highScores', {});
});

app.listen(port, () => console.log(`app Started on port ${port}!`));