const express =require ('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv').config();

const path = require('path');
const bodyParser= require('body-parser');

// const db = require('./database/db');
// const User = require('./models/user');
// const expense = require('./models/expense');
// const Order = require('./models/order');
// const Forgotpassword = require('./models/forgetpassword');
// const FilesDownloaded = require('./models/filesdownloaded');



const app=express();


const postLoginRoute = require('./routes/postLoginRoute');
const postSignRoute = require('./routes/postSignRoute');
const getSignRoute = require('./routes/getSignRoute');
const getLoginRoute = require('./routes/getLoginRoute');
const getExpenseRoute = require('./routes/getExpenseRoute');
const postExpenseRoute = require('./routes/postExpenseRoute');
const deleteExpenseRoute = require('./routes/deleteExpenseRoute');
const premiumRoute = require('./routes/preminumRoute');
const leaderboardRoute = require('./routes/leaderboardRoute');
const getForgetPasswordRoute = require('./routes/getForgetPasswordRoute');
const postForgetPasswordRoute = require('./routes/postForgetPassword');
 const getResetPasswordRoute = require('./routes/getResetPasswordRoute');
// const downloadfileRoute = require ('./routes/downloadfileRoute');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use(postLoginRoute);
app.use(postSignRoute);
app.use(getSignRoute);
app.use(getLoginRoute);
app.use(getExpenseRoute);
app.use(postExpenseRoute);
app.use(deleteExpenseRoute);
app.use(premiumRoute);
app.use(leaderboardRoute);
app.use(getForgetPasswordRoute);
app.use(postForgetPasswordRoute);
app.use(getResetPasswordRoute);
//app.use(downloadfileRoute)




mongoose.connect('mongodb+srv://Indrani:qRLvJFGJajhvtADB@cluster0.xnm1zxm.mongodb.net/expense?retryWrites=true&w=majority').then(()=>{
    app.listen(4000,()=>console.log('server started at port 4000'));
})
.catch((err)=> console.error(err));

//app.listen(4000);


