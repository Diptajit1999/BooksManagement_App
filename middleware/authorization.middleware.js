
const roleAccess=(payload)=>{
return ((req,res,next)=>{
console.log(payload)
console.log(req.body)
const {role}=req.body
if(payload[0]===role){
    console.log("YES")

    next()
}else{
    return res.status(300).send({msg:"You are not the admin"})
}

})
}

module.exports={
    roleAccess
}