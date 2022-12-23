// Task1: initiate app and run server at 3000
var express = require("express");
var Bodyparser = require("body-parser");
var Mongoose = require("mongoose");
var Cors = require("cors");
const {EmployeeModel, employeeModel } = require("./model/employee");

var app = new express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended: false}));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
Mongoose.set('strictQuery', true);
Mongoose.connect("mongodb+srv://jisha:atlas123@cluster0.a2wdl3u.mongodb.net/employeeDB?retryWrites=true&w=majority",
{ useNewUrlParser: true })

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req, res)=>{
    var data = req.body
   
    EmployeeModel.find((err, data)=>{
        if(err)
        {
            res.json({"Status": "Error", "Error" : err});
        }
        else{
            res.send(data);
        }
    })
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req, res) =>{
    
    EmployeeModel.findById(req.params.id, (err, data)=>{
        if(err)
        {
            res.json({"Status": "Error", "Error" : err});
        }
        else{
            res.send(data);
        }
    })
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', (req, res)=>{
    var data = req.body;
   
    var employee = new EmployeeModel(data);
    
    if(Boolean(employee.name))
    {
        employee.save((err, data)=> {
            if(err)
            {
                res.json({"Status": "Error", "Error" : err});
            }
            else{
                res.json({"Status": "Success", "Data" : data});
            }
        })
    }
})

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req, res) => {
    var data = req.body;
    EmployeeModel.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err)
        {
            res.json({"Status": "Error", "Error" : err});
        }
        else{
            res.send({"Status": "Deleted", "Data" : data});
        }

    })
})

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req, res) =>{
    var data = req.body;
    EmployeeModel.findOneAndUpdate({_id: req.body._id}, data, (err, data)=>
    {
        if (err) 
        {
            res.json({"Status": "Error", "Error" : err})
        } else 
        {
            res.send({"Status": "Updated", "Data" : data})
        }
    })
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, ()=>{
    console.log("Server Started");
})