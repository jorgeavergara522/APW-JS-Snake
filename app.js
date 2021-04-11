//jshist esversion:6

const favicon = require("serve-favicon");
const express = require("express");  //express for server startup
const bodyParser = require("body-parser");  //body-parser for reading inputs
const mongoose = require("mongoose");  //mongoose for easier input and retrieval from mongo
const _ = require("lodash");  //module to keep formatting in line so multiple db entries do not occur
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
  secret: "A long sentence.",
  resave: false,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  highscore: Number
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
  res.render('snake');
});

app.get("/register", function(req,res){
  res.render('register');
});

app.post("/register", function(req, res){
User.register({username: req.body.username}, req.body.password, function(err, user){
  if(err){
    console.log(err);
    res.redirect("/register");
  }else {
    passport.authenticate("local")(req,res, function(){
      res.sendFile('game.html', {root: __dirname});
    })
  }
})
});

app.get("/login", function(req,res){
  res.render('login');
});



app.post("/login", function(req, res){
const user = new User({
  username: req.body.username,
  password: req.body.password,
  highscore: 0
});

req.login(user, function(err){
  if(err){
    console.log(err);
  }else {
    passport.authenticate("local")(req,res, function(){
      console.log(req.user);
      res.sendFile('game.html', {root: __dirname});
    });
  }
});

});

app.get("/choices", function(req,res) {
res.render('choices');
});

app.get("/game.html", function(req, res){
  if(req.isAuthenticated()){
  res.sendFile('game.html', {root: __dirname});
}else{
  res.redirect('login');
}
});

app.get("/logout", function(req, res){
  req.logout();
  res.render('snake');
})

app.post("/save", function(req, res){
  const saveScore = req.body.score;

  User.findById(req.user.id, function(err, foundUser){
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        foundUser.score = saveScore;
        foundUser.save(function(){
          res.render('highscores');
        })
      }
    }
  })
})

app.get("/highscores", function(req,res){
  User.find({"email": {$ne: null}}, function(err, foundUsers){
    if(err){
      console.log(err);
    }else {
      if(foundUsers) {
        res.render("highscores", {usersWithScores: foundUsers});
      }
    }
  });
});

















app.listen(3000, function() {
  console.log("Server started listening on port 3000");
});
