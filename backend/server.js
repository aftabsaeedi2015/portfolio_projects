const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');

const dbOperations = require('./dbOperations')


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
app.use(cors())
app.use(express.json());
// database connection
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log('connection successfull to mongodb'))
.catch(err => console.log(err))

app.get('/', async (req, res) => {
  try{
    const result = await dbOperations.get_all_users()
    res.json(result)
    }
    catch(err){
      res.json(err)
    }

});
app.get('/userInfo', async (req, res) => {
  try{
    const id = req.query.id
    const result = await dbOperations.get_user_info(id)
    res.json(result)
    }
    catch(err){
      res.json(err)
    }

});

app.post('/adduser',(req,res)=>{
    res.send(dbOperations.add_user(req.body))
})
app.post('/:class/join',async (req,res)=>{
  try{
    const class_selected = req.params.class
    const user_id = req.body.id
    const joining_date = req.body.joining_date
    result = await dbOperations.join_class(user_id,class_selected,joining_date)
    res.json(result)
  }
  catch(err){
    res.json(err)
  }


})
app.post('/:tier/buy',async (req,res)=>{
  try{
    const membership_tier = req.params.tier
    const user_id = req.body.id
    const joining_date = req.body.joining_date
    result = await dbOperations.buy_plan(user_id,membership_tier,joining_date)
    return res.json(result)
  }
  catch(err){
    res.json(err)
  }
})

app.post('/login',async (req,res)=>{
    try{
      const result = await dbOperations.login_user(req.body)
      res.json(result)
    }
    catch(err){
      res.json(err)
    }
})
app.post('/signup',async (req,res)=>{
  try{
    console.log(req.body)
    const result = await dbOperations.signup_user(req.body)
    res.json(result)
  }
  catch(err){
    res.json(err)
  }
})

app.get('/posts' , async (req,res) => {
  try{
    const posts = await dbOperations.get_all_posts()
    res.json(posts)
  }
  catch(err){
    res.json(err)
    console.log(err)
  }
})

app.get('/getpost/:id',async (req,res)=>{
  try{
    const id = req.params.id
    const result = await dbOperations.get_post(id)
    res.json(result)
  }
  catch(err){
    res.json(err)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
