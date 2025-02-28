const exores = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = exores();
const bodyParser = require("body-parser");
const { mongoConnect, dbName } = require("./db_conf");
mongoConnect();
app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/api/data', (req, res) => {
    res.send('Hello World');
    });

app.post('/api/signup',async (req,res)=>{
    try{
    let {name, email, password}=req.body;
    if(!name || !email || !password)
    {
        console.log('All fields are required');
        return res.status(400).json({message: 'All fields are required'});
        
    }
    const exsitUser = await dbName.collection('users').findOne({email: email});

    //user check if user already exist
    if(exsitUser)
    {
        return res.status(400).json({message: 'User already exist'});
    }

    const user=await dbName.collection('users').insertOne({name, email, password});

    if(user)
    {
        return res.status(201).json({message: 'User created successfully'});
    } 

    else
    {
        return res.status(500).json({message: 'Failed to create user'});
    }
}catch(err){
    console.log(err);
    return res.status(500).json({message: 'Internal server error'});
    }
});
  
app.post('/api/login',async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Input validation
        if (!email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const user = await dbName.collection('users').findOne({ email });
    
        // Check if user exists
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        res.send({ status: true, name: user.name });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
});

app.post('/api/create_blog', (req, res) => {
  const { title, content, author, date, image } = req.body;
  const blog = { title, content, author, date, image };
  const blogCollection = dbName.collection('blogs');
    blogCollection.insertOne(blog, (err
        , result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to create blog' });
                }
                return res.status(201).json({ message: 'Blog created successfully' });
                });
 });

app.listen(port, () => {
    console.log('Your Server is running');
    });