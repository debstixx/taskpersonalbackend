const handleError = (err)=>{
    let errors = {name: "", email: "", password: ""}
    console.log("error==>",err)
    if (err.code === 11000){
       errors.email = "Email is already in use"
       errors.msg = "Email is already in use"
       return errors
    }
    if (err.message === "incorrect email"){
        errors.email = "This email has not been registered"
        errors.msg = "This email has not been registered"
        return errors
    }
    if (err.message === "incorrect password") {
        errors.email = "email or password is incorrect"
        errors.password = "email or password is incorrect"
        errors.msg = "email or password is incorrect"
        return errors
    }

    if (err.message.includes("User validation failed")){
        Object.value(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
            errors.msg = properties.message
        })
    }
    return errors
}


module.exports = handleError