const exores = require('express');
const dotenv = require('dotenv');
const app = exores();
const bodyParser = require("body-parser");
const { mongoConnect, dbName } = require("./db_conf");
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authenticateToken = require('./middleware/auth');
const checkAuth = require('./middleware/checkauth');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

mongoConnect();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT;

const date = new Date();
const dateStr = date.toDateString();

app.use('/uploads', exores.static('uploads'));

//multer (in-memory storage for Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/api/data', (req, res) => {
    res.send('Hello World');
});

app.post('/api/signup', checkAuth, async (req, res) => {
    try {
        let { name, email, password, username } = req.body;
        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const exsitUser = await dbName.collection('users').findOne({ email });
        const exsitUsername = await dbName.collection('users').findOne({ username });

        if (exsitUser) {
            return res.status(409).json({ message: 'User already exist' });
        } else if (exsitUsername) {
            return res.status(409).json({ message: 'Username already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'user';
        const user = await dbName.collection('users').insertOne({ name, username, email, role, password: hashedPassword });

        if (user) {
            return res.status(201).json({ message: 'User created successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', checkAuth, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await dbName.collection('users').findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email, role: user.role, username: user.username }, process.env.jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.send({ status: true, user: { name: user.name, email: user.email, role: user.role, username: user.username } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.send({ status: true, message: 'User logged out successfully' });
});

app.post('/api/create_blog', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { title, content, author, date } = req.body;
        let imageUrl = null;
        let imageName = null;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
            imageUrl = result.secure_url;
            imageName = result.public_id;
        }

        if (!title || !content || !author || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const blog = { title, content, author, date, image: imageUrl, imageName };
        const blogCollection = dbName.collection('blog');
        await blogCollection.insertOne(blog);
        return res.status(201).json({ status: true, message: 'Blog created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/blogs', async (req, res) => {
    try {
        const blogCollection = dbName.collection('blog');
        const blogs = await blogCollection.find().toArray();
        res.send(blogs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/blog/:id', async (req, res) => {
    try {
        const blogCollection = dbName.collection('blog');
        const blogId = req.params.id;
        const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.send(blog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

app.delete('/api/blog/:id', authenticateToken, async (req, res) => {
    try {
        const blogCollection = dbName.collection('blog');
        const blogId = req.params.id;
        const result = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.send({ status: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/user', authenticateToken, async (req, res) => {
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

app.listen(port, () => {
    console.log('Your Server is running');
});
