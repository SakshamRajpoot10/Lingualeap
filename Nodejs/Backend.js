const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'school'
})

connection.connect((err)=>{
    if(err){
        console.error('Error is connecting',err);
        return;
    }
    console.log('Connected to the database as '+connection.threadId);
})



app.post('/mark',(req,res)=>{
   
    const rollno = req.body.rollno;
    const sql = 'SELECT * FROM mark WHERE rollno = ?';
    connection.query(sql,[rollno],(error,results)=>{
        if(error){
            console.error('Error fetching data from mark table:',error);
            return res.status(500).send('Database error');
        }
        res.json(results);
        console.log('Student Marksheet Details fetched successfully');
    });
})

app.post('/selectimage',(req,res)=>{
        // If you want to filter by id/category/imageURL, add WHERE clause and parameters
        const sql = 'SELECT * FROM image';
        connection.query(sql,(error,result)=>{
            if(error){
                console.error('Error fetching data from image table:',error);
                return res.status(500).send('Database error');
            }
            res.json(result);
            console.log('Image Details fetched successfully');
        });
    });



app.listen(port,()=>{
    console.log(`Server is running on localhost :  ${port}`)
})
