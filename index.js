var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var hbs=require('hbs');
var session = require("express-session");
var MongoClient = require("mongodb").MongoClient;
var url;
if(process.env.DB_URL) url=process.env.DB_URL;
else url = "mongodb://localhost:27017";
var db;
var ObjectId = require("mongodb").ObjectID;
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, client) {
    if (error) throw error;
    db = client.db("calorify");
  }
);
//session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "this is secret session"
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
// login and signup
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  if(req.session.signedIn){
    res.redirect('/home');
}
else{
    res.render("login.hbs",{
      layout: false,
      title:"Login"
    });
}
});

app.get("/signup", function(req, res) {
  if(req.session.loggedIn){
    res.redirect('/');
  }
else{
  res.render("signup.hbs",{
    layout: false,
    title:"New User Registration"
  })
}
});
app.post('/auth', (req, res) => {
  var flag=false;
      db.collection('users').find({$and:[{email:req.body.email,password:req.body.password}]}).toArray(function(error,result){
          if(error) throw error;
      for (let i = 0; i < result.length; i++) {
      if(result[i].email==req.body.email && result[i].password==req.body.password){
              flag=true;
              console.log(req.body)
              req.session.user=result[i].email;
              break;
          }
      }
      if(flag){
          req.session.loggedIn=true;
          res.redirect("/home")
          console.log('logged in')
         }
      else
      res.render("invalidLogin.hbs",{
        layout: false,
        title:"Invalid Login"
      });

  });
});

app.post("/signup", function(req, res) {
  db.collection("users").insertOne(req.body);
  console.log("inserted");
  res.redirect('/');
});
//home route(landing page)
app.get("/home", function(req, res) {
  var user;
  db.collection('users').findOne({ "email": req.session.user },function(error,result){
    user=result;
    if(error) throw error
    if(req.session.loggedIn){
    res.render("home.hbs",{
     title:"Calorify.Me!",
     style:'/home.css',
     script:'/home.js',
     data:user
    })
    console.log(user);
  }
  else
res.redirect('/');
})
});
//saving bmi info to db
app.use(bodyParser.json());
app.put('/home/bmi/:id',function(req,res){
    db.collection('users').updateOne({_id:ObjectId(req.params.id)},{$set:{"weight":req.body.weight,"height":req.body.height,"bmiValue":req.body.bmiValue}},function(error,result){
        if(error) throw error;
        console.log(req.body);
    })
});
// getting bmi report
app.get('/home/bmiReport',function(req,res){
  var user;
  db.collection('users').findOne({ "email": req.session.user },function(error,result){
    user=result;
    if(error) throw error
    if(req.session.loggedIn){
    if(result.bmiValue>=18.5 && result.bmiValue<=24.9){
      res.render("bmiHealthy.hbs",{
       title:"BMI Report",
       style:'/home.css',
       script:'/macro.js',
       data:user
      });
    }
    else if(result.bmiValue<18.5){
      res.render("bmiUnder.hbs",{
        title:"BMI Report",
        style:'/home.css',
        script:'/macro.js',
        data:user
       });
    }
    else if(result.bmiValue>=25 && result.bmiValue<=29.9){
      res.render("bmiOver.hbs",{
        title:"BMI Report",
        style:'/home.css',
        script:'/macro.js',
        data:user
       });
    }
    else{
      res.render("bmiObese.hbs",{
        title:"BMI Report",
        style:'/home.css',
        script:'/macro.js',
        data:user
       });
    }
  }
  else
  res.redirect('/');

})
})
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
app.listen(process.env.PORT||3000);
