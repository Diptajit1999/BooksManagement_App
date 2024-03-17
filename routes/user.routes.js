const express=require("express")

const userRouter=express.Router()


userRouter.post("/register",(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).send({msgErr:error})
    }
})

module.exports={
    userRouter
}