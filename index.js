const express = require ('express');
const app = express();
const mongoose  = require ('mongoose');
let bodyParser = require ('body-parser');


app.set('view engine','ejs');
app.use(express.urlencoded({ extended:true}));

mongoose.connect('mongodb://localhost/GracifyTech',{usenewUrlParser:true})
    .then (()=>console.log('Database Connected'))
    .catch (err => console.log(err));

const registerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
});

const User = mongoose.model('User', registerSchema);

app.get('/', (req, res)=>{
    res.render('home', {title: "Welcome To Our Cameroon's Citizen Database System", signature: 'made with ❤ by gracify technologies'});
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post ('/', (req, res)=>{
    const {name, email} =  req.body;
    const newUser = new User ({name, email});
    newUser.save()
    .then (console.log('new user saved'))
    res.redirect('/users')
})

app.get ('/users', (req, res) =>{
    User.find().sort({"_id":-1})
    .then(function(doc){
        res.render('users', {items: doc, header: "Registered Users"});
    })
})


app.listen (3000, ()=>{
    console.log('server running on port 3000');
})