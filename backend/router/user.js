const express = require("express");

const router = express.Router();
const zod = require("zod");
const User = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");


const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})


router.post("/signup", async (req, res)=>{
    const body = req.body;
    console.log(body);

    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(200).json({
            message:"Incorrect Inputs"
        })
    }
    
    const existingUser = User.findOne({
        username: body.username
    })
    
    if (existingUser._id){
        return res.status(200).json({
            message:"User Already exists"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.status(200).json({
        message: "Signup Successful",
        token: "Bearer" + token
    })
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


router.put("/update", async (req,res)=>
{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne( req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })
    )
    })
})


router.put("/", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
}
)


module.exports = router;