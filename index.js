
const express=require('express');
const app=express();
const port=3001;

app.get('/',(req,res)=>{
    // res.send("hello heas")
    res.json({message:"This is a homepage"})
})

app.get('/users',(req,res)=>{
    // res.send("hello heas")
    res.json({message:"This is to get all users"})
})


app.get('/users/:id',(req,res)=>{
    // res.send("hello heas")
    res.json({message:`This is where we can get all users ${req.params.id}`})
})

app.post('/users',(req,res)=>{
    // res.send("hello heas")
    res.json({message:`User add`})
})

app.put('/users/:id',(req,res)=>{
    // res.send("hello heas")
    res.json({message:`This is where we can get update users ${req.params.id}`})
})

app.delete('/users/:id',(req,res)=>{
    // res.send("hello heas")
    res.json({message:`This is where we can delete users ${req.params.id}`})
})
app.listen(port,()=>{
    console.log("App running")
})