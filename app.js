const express = require("express"); //done
const bodyParser = require("body-parser"); //done
const mongoose = require("mongoose");   //done
const _ = require("lodash"); //done
const ejs = require('ejs'); //done
const bcrypt=require('bcrypt');
const session = require('express-session')  //done
const passport = require('passport');  //done
const passportLocalMongoose = require('passport-local-mongoose');  //done
const ejsMate=require('ejs-mate'); //done

const app = express();
const path=require('path')

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.engine('ejs',ejsMate);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

useUnifiedTopology: true
mongoose.connect("mongodb+srv://Admin:Logan007@cluster0.8lyo8nn.mongodb.net/UsersDB", {useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connectioon error:"));
db.once("open",()=>{
    console.log("Database connected");
});
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
    password:String,
    fname:String,
    lname:String,
    mobile:String,
  })
  userSchema.plugin(passportLocalMongoose);

    const User = new mongoose.model("User", userSchema);

    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.get("/dashboard", function(req, res){
        if(req.isAuthenticated()){
          res.render("dashboard")
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


app.post("/register", async function(req, res){

  const passwordHash=await bcrypt.hash(req.body.password,10);
  
const newUser=new User({username:req.body.username,
  password:passwordHash,
fname:req.body.fname,
lname:req.body.lname,
mobile:req.body.mobile

});
await newUser.save();
res.redirect('/login');
 });

 app.post('/login',async (req,res)=>{
        const user=await User.findOne({username:req.body.username});
        const passMatch=await bcrypt.compare(req.body.password,user.password);
        console.log(passMatch);
        if(passMatch){
          //authorization successful
          res.redirect(`/new/${user.username}`);
        }
        else{
          // authorization failed
          res.redirect('/failure');
        }
        
      })

app.get("/", function(req, res){
    res.render("home");
  });

app.get("/new/:username", async function(req, res){
  // const user=await User.findOne({username:req.body.params.username});
  console.log(req.body);
  res.render("new");
});
app.get("/dashboard", function(req, res){
    res.render("dashboard");
  });
app.get("/login",function(req, res){
    res.render("login")
})
app.get("/failure",function(req, res){
    res.render("failure")
})
app.get("/register",function(req, res){
    res.render("register")
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  

  // app.post("/register", function(req, res){
//         User.register({username:req.body.username}, req.body.password, function(err, user) {
//         if (err) {
//           console.log(err);
//           res.redirect("/register")
//         } else{
//           passport.authenticate("local")(req, res, function(){
//             res.redirect("/dashboard")
//           })
//         }
//       });
//       });
// app.post("/login", function(req, res){
//         const user = new User({
//           username : req.body.username,
//           password : req.body.password
          
//         })

//         req.login(user, function(err){
//           if(err){
//             console.log(err);
//           } else{
//             passport.authenticate("local")(req, res, function(){
//               res.redirect("/dashboard")
//             })
//           }
//         })

        
       
  
 
//       });

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/failure' }),
//   function(req, res) {
//     res.redirect('/dashboard');
//   });