const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport= require('passport');
const path =require('path');
const users= require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts= require('./routes/api/posts');


const app=express();

//middleware -Body
app.use(bodyParser.urlencoded({extended: false}));    // understanding the middleware
app.use(bodyParser.json());

const db=require('./config/keys.js').mongoURI;


mongoose
.connect(db)
.then(() => console.log('connected'))
.catch(err => console.log(err));

// middleware passport 
app.use(passport.initialize());
require('./config/passport')(passport);                      // why? (passport) in brackets


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res)=> res.send('Hello World'));

const port= process.env.PORT || 5000;
 
app.listen(port, ()=> console.log(`server running on port ${port}`));