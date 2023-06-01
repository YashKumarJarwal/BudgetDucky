const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require('ejs');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const ejsMate=require('ejs-mate');

const app = express();
const path=require('path')

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.engine('ejs',ejsMate);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

useUnifiedTopology: true
mongoose.connect("mongodb+srv://Admin:Logan007@cluster0.8lyo8nn.mongodb.net/UsersDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(session({
    secret: 'meowmiau',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  const userSchema = new mongoose.Schema({
    email:String,
    password:String
  })
  userSchema.plugin(passportLocalMongoose);

    const User = new mongoose.model("User", userSchema);

    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.get("/dashboard", function(req, res){
        if(req.isAuthenticated()){
          res.render("random")
        }
        else{
          res.redirect("/login")
        }
      })

app.get("/abc", (req, res) => {
    res.render("random")
})
      app.get("/logout", function(req, res){
        req.logout(function(err) {
          if (err) {  console.log(err); }
          else{res.redirect("/") }
        });
      })

      app.post("/register", function(req, res){
        User.register({username:req.body.username}, req.body.password, function(err, user) {
        if (err) {
          console.log(err);
          res.redirect("/register")
        } else{
          passport.authenticate("local")(req, res, function(){
            res.redirect("/dashboard")
          })
        }
      });
      });

      app.post("/login", function(req, res){
        const user = new User({
          username : req.body.username,
          password : req.body.password
        })

        req.login(user, function(err){
          if(err){
            console.log(err);
          } else{
            passport.authenticate("local")(req, res, function(){
              res.redirect("/dashboard")
            })
          }
        })
      });

app.get("/", function(req, res){
    res.render("home");
  });
app.get("/login",function(req, res){
    res.render("login")
})
app.get("/register",function(req, res){
    res.render("register")
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  