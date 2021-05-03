// Jorge

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const passport = require("passport");
const errors = require("errors");

router.post("/registerUser", (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);
   console.log('here', req.body)
   if (!isValid) {
     return res.status(400).json(errors);
   }


  User.findOne({ handle: req.body.handle }).then((user) => {
    if (user) {
      errors.handle = "User already exists";
      return res.status(400).json(errors);

    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
  console.log(req.body.handle, "this is my signup function");
  res.render('pages/home', {user: {handle: req.body.handle}});
});

router.post("/loginUser", (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);

   if (!isValid) {
     return res.status(400).json(errors);
   }

  // Michael, Jeff, Devon

  const email = req.body.email;
  const password = req.body.password;
  let userID;
  User.findOne({ email }).then((user) => {

    if (!user) {
      console.log("error from login");
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
      console.log("passwords matched");
        const payload = { id: user.id, handle: user.handle };
        console.log(user.handle);
        userID=user.id;
        console.log(user.id, "this is my user ID");
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
        console.log(user.handle);
      } else {
        console.log("error from login_3");
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
  console.log(userID, "this is my login function");
  res.render('pages/home', {user: {handle: req.body.handle, id: userID}});
  
  
});


router.post("/score", async (req, res) => {


  await User.findOneAndUpdate({handle: req.body.user}, {highscore: req.body.score})
 
 


 res.status(200)
})

module.exports = router;