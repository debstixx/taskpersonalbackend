const mongoose = require("mongoose")
const Schema = mongoose.Schema
// "npm i validator" code installing validator and is required in the schema to validate
const {isEmail} = require("validator")
// "npm install bcrypt" bcrypt must be reqiured b4 being use to hash each password.
const bcrypt = require("bcrypt")
// "npm install jsonwebtoken" code to install jwt and connect
const jwt = require("jsonwebtoken")




const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an emaill"],
        unique: true,
        validate: [isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minLength:[8, "the minimum length is 8"]
    },
}, {timestamps: true});


//Function for bcrypt below: this function is to salt and hash the password.
userSchema.pre("save", async function(next){ 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// function to compare password for login inside authController component;
userSchema.methods.comparePassword = async function(userPassword){ 
    const isCorrect = await bcrypt.compare(userPassword, this.password)

    return isCorrect;
}

// function to generate token when user logIn
userSchema.methods.generateToken = function (){
    return jwt.sign({userId: this._id, name: this.name}, process.env.jwt_secret, {expiresIn: "1d"})
}




module.exports = mongoose.model("User", userSchema);