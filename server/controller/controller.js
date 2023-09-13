const userModel = require('../model/model');
const adminModel = require('../model/model');
require('dotenv').config();

//Create and saving User after register validation
exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"});
        return;
    }

    //new user
    const user = new userModel({
        name: req.body.name,
        email: req.body.mail,
        password: req.body.password
    })

    //saving the user to DB
    user
        .save(user)
        .then(data =>{
            res.redirect('/main');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error saving user"
            });
        });
        
}

//Create and saving User
exports.dashboard_create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"});
        return;
    }

    //new user
    const user = new userModel({
        name: req.body.name,
        email: req.body.mail,
        password: req.body.password
    })

    //saving the user to DB
    user
        .save(user)
        .then(data =>{
            res.redirect('/dashboard');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error saving user"
            });
        });
        
}
//Updating the users using dashboard function
exports.dashboard_update = (req,res) =>{
    const id = req.params.id;
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"});
        return;
    }

    //updating the user to DB
    userModel.findByIdAndUpdate(id,req.body)
        .then(data =>{
            res.redirect('/dashboard');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error updating user"
            });
        });
        
}

//Finding User for dashboard
exports.findUser = async (req,res) =>{
    try{
        // Finding using form data and seraching through the DB
        const findUsers =await userModel.find({name : req.body.search});
        console.log(findUsers)
        if(findUsers != null){
            res.render('find_users',{findUsers});
        }
        else{
            findUsers.name = "No users found";
            res.render('find_users',{findUsers});
        }
    }
    catch(err){
        console.log(err)
        findUsers.name = "No users found";
        res.render('find_users',{findUsers});
    }
}

//Login Function for users
exports.login = async (req,res) =>{
    try{
        // Finding user using form data and Logining in
        const check =await userModel.findOne({email: req.body.mail});
        if(check.password === req.body.password){
            res.redirect('/main')
        }
        else{
            res.send("Wrong password or username")
        }
    }
    catch(err){
        console.log(err)
        res.send("Wrong Credintials")
    }
}

//login function of admin user
exports.admin = async (req,res) =>{
    try{
        // getting admin credentials from env file and making sure its matching if matches admin will be logged in
        if(process.env.ADMIN_USERNAME === req.body.username && process.env.ADMIN_PASSWORD === req.body.password){
            res.redirect('/dashboard')
        }
        else{
            res.send("Wrong password or Username")
        }
    }
    catch(err){
        console.log(err)
        res.send("Wrong Credintials")
    }

}

//To displap alll users in collection
exports.dashboard = async (req, res) => {
    try{
        const data = await userModel.find()

        res.render('dashboard',{ data });
    }catch(err){
        console.log(err)
    }
}

//To view a user according to input field
exports.viewUser = async (req, res) => {
    const email = req.params;

    userModel.findOne({email: email.id})
        .then((user) => {
            res.render('view_user',{ user });
        })
        .catch((err) => {
            res.status(500).send({message: err.message  || "  Errors Occured while retrieving info"});
        })
}

//To delete a single user
exports.deleteUser = async (req, res) => {
    const email = req.params;

    userModel.deleteOne({email: email.id})
        .then((user) => {
            res.redirect('/dashboard');
        })
        .catch((err) => {
            res.status(500).send({message: err.message  || "  Errors Occured while Deleting info"});
        })
}
