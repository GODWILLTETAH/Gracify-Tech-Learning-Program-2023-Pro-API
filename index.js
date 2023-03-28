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

const User = mongoose.model('visitor', registerSchema);

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post ('/', (req, res)=>{
    const {name, email} =  req.body;
    const newUser = new User ({name, email});
    newUser.save()
    .then (console.log('new user saved'))
    res.redirect('/')
})

app.listen (3000, ()=>{
    console.log('server running on port 3000');
})