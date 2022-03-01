const path = require("path");
var express = require("express");
const { get } = require("express/lib/response");
var mysql = require("mysql");
var app = express();
const bodyparser = require("body-parser");


app.set('views', path.join(__dirname, './views'))
app.set('view engine','ejs');
app.use(bodyparser.urlencoded());
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'sampleDB'
});

connection.connect(function(error){
if(!!error){
  console.log('error');
}
else{
  console.log('connected');
}

});


app.post("/",function(req,res,next){
  const email = req.body.email;
  const name = req.body.name;
  connection.query("SELECT * from employees where email=?",[email],function(err,result){
    console.log(result.length);
    if(result.length>0){
      connection.query("UPDATE employees set name=? where email=?",[name,email],function(err,result){
        if(!err){
          // pass message using render into users.ejs
          res.render('users',{message:"Name updated successfully"});
          console.log("name updated ")
        }
      })
    }
    else if(req.body.email!==null&&req.body.name!==null){
      connection.query("INSERT into employees (name,email) values (?,?)",[name,email],function(err,result){
        if(!err){
          // new user successfully created message to be passed
          console.log("User added");
          res.render('users',{message:"User added  successfully"});
          
        }
        else{
          console.log('error occured');
        }
      })
    }

  })
})
app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"/index.html"));
})




app.get('/get',function(req,res){
  var value = connection.query("SELECT * from employees",function(err,res){
    if(err) throw err;
    console.log(res);
  })
})



app.listen(3005);