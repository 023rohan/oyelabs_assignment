const express =  require("express");
const mysql = require("mysql");
const app = express();
const {body} = require("express-validator/check");
const bodyparser = require("body-parser");
const res = require("express/lib/response");
app.use(bodyparser.json());

var connection;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Method","get,post,put,patch");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    next();
})

app.post('/login',[body("phone").isNumeric(),body("pass").trim().isAlphanumeric()],(req,res)=>{

const phone = req.body.phone;
const pass = req.body.pass;
connection.query("select * from users where phone=? and pass=?",[phone,pass],function(err,result){
    if(!err&&result.length>0){
        res.json({
            mess:"logged in successfully"
        })
        
    }
    else{
        res.json({
            mess:"failed"
        })
        console.log("error",err);
    }
})
})
app.post('/signup',[body("phone").isNumeric().isLength({min:10,max:10}),body("pass").trim().isAlphanumeric(),body("confirm").trim().isAlphanumeric()],(req,res)=>{
    const phone = req.body.phone;
    const pass = req.body.pass;
    const confirm  = req.body.confirm;
    if(pass===confirm){
    connection.query("select phone from users where phone =?",[phone],function(err,result){
        if(result.length>0){
            res.json({
                mess:"number already exist"
            })
           
        }
        else{
            connection.query("insert into users values (?,?)",[phone,pass],function(err,result){
                if(!err){
                    res.json({
                        mess:"user added successfully"
                    })
                    
                }
                else console.log(err);
            })
        }
    })
    }
    // res.json({
    //     mess:"failed"
    // })
})

connection = mysql.createConnection({
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
    app.listen(3500);
  }
  
  });
