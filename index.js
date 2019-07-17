require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Post = require("./model/Post");
const app = express();

mongoose.connect(process.env.Mongo_URI,{ useNewUrlParser: true },()=>{

console.log("mongodb is connected");
})

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    Post.find({},(error,posts)=>{
        if(error){
            console.log(error.messager);
        }else{
            res.render('index',{posts:posts});
        }
    })
    
})
app.get("/error",(req,res)=>{
    res.render('error');
})
app.post("/",(req,res)=>{


const postCreate = new Post({content:req.body.name});

postCreate.save().then(data =>{
    console.log(data);
   return res.redirect("/")
    }).catch(err =>{
        console.log(err.messager)
    })
})
app.get("/:id",(req,res)=>{

Post.findOne({_id:req.params.id},(error,post)=>{
    console.log(post)
    res.render('update',{post})
})
    
 })
app.post("/:id",(req,res)=>{
    const content = req.body.name
    Post.findByIdAndUpdate({_id:req.params.id},{$set:{content}},(error,post)=>{
        if(error){
            console.log(error);
        }else{
            console.log(post)
            res.redirect("/");
        }
    })
})
app.post("/post/:id",(req,res)=>{
    Post.remove({_id:req.params.id},(err,post)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/");
        }
    })
})

app.listen(3000,()=>{
    console.log("it is running.....");
})