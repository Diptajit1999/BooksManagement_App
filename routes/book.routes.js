const express=require("express");

const bookRouter=express.Router()

bookRouter.get("/create",(req,res)=>{
    res.status(200).send("books route wip...")
}) 

module.exports={bookRouter}