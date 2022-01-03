const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'mysqlroot123!',
    database:'user_hobbies',
});

app.post('/create',(req,res)=>{
    console.log(req.body.name);
    const name = req.body.name;


    db.query(
        'INSERT INTO users (user_name) VALUES (?)',name,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("values inserted");
        }
    });
});

app.get('/getUsers',(req,res)=>{
    db.query('SELECT * FROM users',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.post('/addUserHobby',(req,res)=>{
    const userid = req.body.userid;
    const passion = req.body.passion;
    const hobby = req.body.hobby;
    const year = req.body.year;


    db.query(
        'INSERT INTO hobbies (user_id,hobby_name,passion,enter_year) VALUES (?,?,?,?)',
        [userid,hobby,passion,year],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("values inserted");
        }
    });
});

app.get('/getUserHobbies/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query('SELECT * FROM hobbies where user_id = ? ',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete('/deleteHobby/:id',(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM hobbies where hobby_id = ?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
/*
app.put('/update',(req,res)=>{
    const id = req.body.id;
    const age = req.body.age;
    
    db.query('UPDATE employees SET employee_age = ? where employee_id = ?',
    [age,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("updated");
            res.send(result);
        }
    });
});
*/
app.listen(3001, () =>{
    console.log("Your server is running on port 3001");
});