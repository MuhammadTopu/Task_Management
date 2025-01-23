const router = require("express").Router();
const User = require("../models/user.js");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth.js");

// sign in route
router.post("/signin", verifyToken ,async (req,res)=>{
   try {
    const {username,email,password} = req.body;
   
    const existUsername = await User.findOne({username: username});
    const existEmail = await User.findOne({email: email});

    if(existUsername || existEmail ){
       return res.status(400).json({message: "Username or Email already exits"})
    }else if(username.length < 4){
        return res.status(400).json({message: "Username should have at least 4 characters"});
    }
   const haspass = await bycript.hash(req.body.password,10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:haspass ,
    });

    await newUser.save();
    return res.status(200).json({message:"Sign up completed"});
   } catch (error) {
    console.log(error);
    return res.status(400).json({message: "Internal server error"})
    
   }

});

//log in route 
router.get("/login",verifyToken, async (req, res)=>{
    try {
        const { email, password } = req.body;

        // Check if email exists
        const existEmail = await User.findOne({ email });
        if (!existEmail) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Compare password
        const isPasswordValid = await bycript.compare(password, existEmail.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate JWT token
        const payload = { email: existEmail.email, id: existEmail._id };
        const token = jwt.sign(payload, "ttooppuu", { expiresIn: "1d" });

        // Respond with user details and token
        res.status(200).json({
            id: existEmail._id,
            email: existEmail.email,
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;  