const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/home',(req,res)=>{
    res.sendFile(`${publicPath}/home.html`);
});

app.set('view engine', 'ejs');

const reqFilter= (req,res,next)=>{
    if(!req.query.age)
    {
        res.send('Please provide age');
    }
    else if(req.query.age < 18)
    {
        res.send('Only 18+');
    }
    else{
        next();
    }
    
};

//app.use(reqFilter);

app.get('/',(req,res)=>{
    res.send('Hello this is my roots');
});

app.get('/profile',reqFilter,(req,res)=>{
    const user = {
        name: 'Amey Karekar',
        email: 'Amey@test.com',
        skills: ['Data Engineer','Web Developer','Graphics Designer']
    };
    res.render('profile',{user});
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.listen(5000);