var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var hbs=require('hbs');
var multer=require("multer");
var upload=multer({dest:'public/profilePic'});
const dotenv=require("dotenv");
dotenv.config();
var cloudinary=require("cloudinary").v2;
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
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
//login authorization
app.post('/auth', (req, res) => {
  var flag=false;
      db.collection('users').findOne({email:req.body.email},function(error,result){
      if(error) throw error;
      bcrypt.compare(req.body.password,result.password,function(error,auth){
        if(auth)
        {
          flag=true;
              console.log(req.body)
              req.session.user=result.email;
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
        })
      })

    })
});
//posting signup data to database
app.post("/signup", function(req, res, next) {
  var pass="";
  bcrypt.genSalt(saltRounds,function(error,salt){
    bcrypt.hash(req.body.password,salt,function(error,hash){
      pass=hash;
      var update=req.body;
      update.password=hash;
      db.collection("users").insertOne(update);
      console.log("inserted");
      res.redirect('/');
    
    })
  })
});
// profile editing route
/////////////////////////////////////////////////////////////////////////////////////
app.post('/editName',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})
app.post('/editMail',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})
app.post('/editDob',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})
app.post('/editSex',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})
app.post('/editWh',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})
app.post('/editStatus',function(req,res){
  db.collection('users').updateOne({"email":req.session.user},{$set:req.body},function(error,result){
    if(error) throw error;
    if(req.session.loggedIn){
      res.redirect('/editProfile');
       console.log(req.body)
    }
    else res.redirect('/');
  })
})

/////////////////////////////////////////////////////////////////////////////////////
//profile picture upload
app.post("/upload",upload.single('profilePic'),function(req,res,next){
  if(req.session.loggedIn){
    cloudinary.uploader.upload(req.file.path,function(error,result){
      if(error) {
        return res.send('error occurred while uploading image')
    }
    if(result){
      db.collection('users').updateOne({"email":req.session.user},{$set:{"profilePic":result.secure_url}},function(error,data){
        if(error) throw error;
        res.redirect('/home');
      })
    }

    })
  }
  else res.redirect('/');

})
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
app.get('/bmiReport',function(req,res){
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
// edit profile route
app.get('/editProfile',function(req,res){
  var user;
  db.collection('users').findOne({ "email": req.session.user },function(error,result){
    user=result;
    if(error) throw error
    if(req.session.loggedIn){
      res.render("editProfile.hbs",{
        title:"My Profile",
        style:'/home.css',
        script:'/profile.js',
        data:user
       })
    }
else res.redirect('/');
    })
})
//logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
app.listen(process.env.PORT||3000);
