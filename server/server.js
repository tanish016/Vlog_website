const exores = require('express');
const dotenv = require('dotenv');
const app = exores();
const bodyParser = require("body-parser");
const { mongoConnect, dbName } = require("./db_conf");
const multer=require('multer');

mongoConnect();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT;

const date=new Date();
const dateStr=date.toDateString();

//multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    }
    ,
    filename: (req, file, cb) => {
        cb(null, dateStr+ '-' + file.originalname);
    }
    });
    const upload = multer({ storage: storage });


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



app.post('/api/create_blog', upload.single('image'), async (req, res) => {
    try{
  const { title, content, author, date} = req.body;
  const image = req.file? req.file.path : null;
  if (!title || !content || !author || !date) {
    return res.status(400).json({ message: 'All fields are required' });
}
const blog = { title, content, author, date, image };
  const blogCollection = dbName.collection('blog');
    blogCollection.insertOne(blog, (err
        , result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Failed to create blog' });
                }
                console.log('Blog created successfully');
                return res.status(201).json({ message: 'Blog created successfully' });
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
                }
 });

app.listen(port, () => {
    console.log('Your Server is running');
    });