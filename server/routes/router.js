const express = require('express');
const route = express.Router();
const { body,check,validationResult } = require('express-validator');
const ejs = require('ejs');
const controller = require('../controller/controller');
const { create } = require('../controller/controller');
const passport = require('passport');
const Users = require('../model/model');
require('../auth/auth');

//Page Routing Settings

/**
 * @description Root Route
 * @method GET / 
 * 
 */
route.get('/', (req, res) => {
    res.render('home');
})
/**
 * @description Login Route
 * @method GET /login 
 * 
 */
route.get('/login', (req, res) => {
    res.render('login');
}
)
/**
 * @description Sign Up Route
 * @method GET /signup 
 * 
 */
route.get('/signup',async (req,res) =>{    
    res.render('signup');
})

/**
 * @description Signup form submission route
 * @method GET /send 
 * 
 */
route.post('/send',[
        check('name')
            .notEmpty()
            .withMessage('Name must not be empty')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 chars long'),
        check('mail').isEmail().withMessage('Email Is Not Valid'),
        check('password').notEmpty().withMessage('Password Cannot be empty')
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('signup',{errors: errors.mapped()});
        }else {
            create();
        }
        
    }
)

/**
 * @description Google authentication
 * @method GET /auth/google
 * 
 */
route.get('/auth/google',
    passport.authenticate('google', {scope : ['email','profile']})
)

/**
 * @description Google authentication Endpoint
 * @method GET /auth/google/callback
 * 
 */
route.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect: '/google_main',
        falseRedirect: '/signup'
    })
)

/**
 * @description Logout Route
 * @method GET /user_logout
 * 
 */
route.get('/user_logout',(req,res) =>{    
    res.render('signup')
})

/**
 * @description Main Route
 * @method GET /user_logout
 * 
 */
route.get('/main',(req,res) =>{    
    res.render('main')
})

/**
 * @description Main page for Google authentication succeeded users
 * @method GET /google_main
 * 
 */
route.get('/google_main',(req,res) =>{ 
    let name = req.user;
    console.log(name)
    res.render('main');
})


/**
 * @description Dashboard Routes
 * @method GET /Dashboard
 * 
 */
route.get('/dashboard', controller.dashboard);
route.get('/admin_login',(req,res) =>{    
    res.render('admin');
})
//dashboard functions
route.get('/create_user',(req,res) =>{    
    res.render('create_user');
})
route.get('/delete_all_user',(req,res) =>{    
    res.render('delete_all_user');
})
route.get('/dash_find_users',(req,res) =>{    
    res.render('find_users');
})
route.post('/find_user', controller.findUser);
route.post('/view_user:id', controller.viewUser);
route.post('/delete_user:id', controller.deleteUser);
route.post('/update_user:id',(req, res) => {
    const id = req.params.id;
    res.render('update_user',{ id });
});

//API routes for DB opertions
route.post('/api/users', controller.create);
route.post('/api/dash_create', controller.dashboard_create);
route.post('/api/dash_update:id', controller.dashboard_update);
route.post('/api/login', controller.login);
route.post('/api/admin', controller.admin);



module.exports = route