//Calling all the required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const File = require("./models/fileModel.js");
const User = require("./models/userModel.js");

const app = express();

//Configurations for "body-parser"
app.use(bodyParser.json());                         //To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //To support URL-encoded bodies

app.use(cors());

//Configuration for "Static-files"
app.use('/uploads', express.static('uploads'));

//Use this to check if the server is working
app.get('/', (req, res)=>{
    res.send("Welcome to your server");
});

//Handling user signup
app.post("/register", (req, res) => {
    try {
        User.create(req.body.user);
        res.status(200).json({
            status: "success",
            message: "User account has been created successfully!",
        });

        console.log("User account has been created successfully!");
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

//Handling user login
app.post("/login", async (req, res) => {
    try {
        const user = await User.find({
            password: req.body.user.password,
            username: req.body.user.username
        });

        console.log("The following user is logged in successfully:");
        console.log(user);

        res.status(200).json({
            status: "success",
            user
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

//Configuration for Multer
//storage object
//Define the storage location for the images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    //By default, multer removes file extension, so they are added back
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
    }
});

//Calling the "multer" function
const upload = multer({ 
    storage: storage
});

//Endpoint for uploading file
app.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    //req.body contains information of text fields, if there were any
    //req.file contains information of uploaded file
    //console.log(req.body);
    //console.log(req.file);

    try {
        let username = req.body.username;
        let filename = req.file.filename;
        
        const filter = { username: username };
        const update = {
            'avatar': `http://localhost:3000/uploads/${filename}`
        };

        let doc = await User.findOneAndUpdate(filter, update);
        doc = await User.findOne({username: req.body.user.username});
        res.status(200).json({
            status: "success",
            message: "File uploaded successfully!",
            doc
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/upload-post', upload.single('post'), async (req, res) => {
    try {
        const newFile = await File.create({
            author: req.body.author,
            description: req.body.postDescription,
            name: req.file.filename,
            path: `http://localhost:3000/uploads/${req.file.filename}`
        });
        res.status(200).json({
            //filename: `${req.file.filename}`,
            status: "success",
            message: "File uploaded successfully!!",
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find();
        //console.log(users[0]);
        res.status(200).json({
            status: "success",
            users,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/get-user-by-email', async (req, res) => {
    try {
        const user = await User.find({
            email: req.body.user.email
        });
        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/get-user-by-username', async (req, res) => {
    try {
        const user = await User.find({
            username: req.body.user.username
        });
        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/get-user-by-username-and-pass', async (req, res) => {
    try {
        const user = await User.find({
            username: req.body.user.username,
            password: req.body.user.password
        });
        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.get('/get-all-posts', async (req, res) => {
    try {
        const posts = await File.find();
        res.status(200).json({
            status: "success",
            posts,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/get-user-posts', async (req, res) => {
    try {
        const posts = await File.find({
            author: req.body.user.username
        });
        res.status(200).json({
            status: "success",
            posts,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/delete-user', async (req, res) => {
    try {
        await User.deleteOne({ email: req.body.user.email,
                                     username: req.body.user.username,
                                     password: req.body.user.password });
        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/update-user', async (req, res) => {
    try {
        let user = req.body.user;
        let usernameOldValue = req.body.user.usernameOldValue;
        //console.log(user);
        delete user.usernameOldValue;

        const filter = { username: usernameOldValue };
        const update = user;
        //console.log(user);

        let doc = await User.findOneAndUpdate(filter, update);
        doc = await User.findOne({username: req.body.user.username});
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

//Express server
module.exports = app;