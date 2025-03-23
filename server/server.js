const exores = require('express');
const dotenv = require('dotenv');
const app = exores();
const bodyParser = require("body-parser");
const { mongoConnect, dbName } = require("./db_conf");
const multer=require('multer');
const bcrypt=require('bcrypt');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authenticateToken = require('./middleware/auth');
const checkAuth =require('./middleware/checkauth');



mongoConnect();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT;

const date=new Date();
const dateStr=date.toDateString();

app.use('/uploads', exores.static('uploads'));

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


app.post('/api/signup', checkAuth, async (req,res)=>{
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
    const hashedPassword=await bcrypt.hash(password, 10);
    password=hashedPassword;
    const role='user';
    const user=await dbName.collection('users').insertOne({name, email, role, password});

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

  
app.post('/api/login', checkAuth, async (req,res)=>{
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
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json({status:true,message: 'Invalid password'});
        }
        const token = jwt.sign({ email: user.email }, process.env.jwtSecret, { expiresIn: '1h' });
        console.log('User logged in successfully');
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.send({ status: true, name: user.name });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token',{httpOnly:true,secure:true,sameSite:'strict'});
    res.send({ status: true, message: 'User logged out successfully' });
})


app.post('/api/create_blog', authenticateToken, upload.single('image'), async (req, res) => {
    try{
  const { title, content, author, date} = req.body;
  const image = req.file? req.file.path : null;
  if (!title || !content || !author || !date) {
    return res.status(400).json({ message: 'All fields are required' });
}
const blog = { title, content, author, date, image };
  const blogCollection = dbName.collection('blog');
    const data_add=blogCollection.insertOne(blog, (err
        , result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Failed to create blog' });
                }
                else{
                    res.send({ status: true, message: 'Blog created successfully' });
                }
                });
                if(data_add){
                    console.log('Blog created successfully');
                    return res.status(201).json({ message: 'Blog created successfully' });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
                }
 });

 app.get('/api/blogs', async (req, res) => {
    try {
        const blogCollection = dbName.collection('blog');
        const blogs = await blogCollection.find().toArray();
        const blogList = blogs.map(blog_all => ({
         ...blog_all,
         imageUrl: blog_all.image ? `${req.protocol}://${req.get('host')}/${blog_all.image}` : null
         }));
        res.send(blogList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/blog/:id', async (req, res) => {
    try {
        const blogCollection = dbName.collection('blog');
        const blogId = req.params.  id;

        // Match the ID as a string (assuming blogId is a string in MongoDB)
        const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) });
        console.log(blog);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const blogData = {
            ...blog,
            imageUrl: blog.image ? `${req.protocol}://${req.get('host')}/${blog.image}` : null
        };

        res.send(blogData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// fetch the current user account

app.get('/api/account', authenticateToken, async (req, res) => {
    try {
        const user = await dbName.collection('users').findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


//delete Vlog
app.delete('/api/blog/:id', authenticateToken, async (req, res) => {
 try{
    const blogCollection = dbName.collection('blog');
    const blogId = req.params.id;
    const result = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
    if(result.deletedCount === 0){
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.send({ status: true, message: 'Blog deleted successfully' });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
        }
});



app.listen(port, () => {
    console.log('Your Server is running');
    });