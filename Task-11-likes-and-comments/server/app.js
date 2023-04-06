//Calling all the required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const Comment = require("./models/commentModel.js");
const Post = require("./models/postModel.js");
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
        const newFile = await Post.create({
            author: JSON.parse(req.body.author),
            description: req.body.postDescription,
            name: req.file.filename,
            path: `http://localhost:3000/uploads/${req.file.filename}`
        });
        res.status(200).json({
            //filename: `${req.file.filename}`,
            status: "success",
            message: "File uploaded successfully!",
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

/**
 * Collection comments
 */
 app.post('/add-comment', async (req, res) => {
    try {
        Comment.create({
            author: { avatar: req.body.commentObj.authorAvatar,
                      username: req.body.commentObj.author
            },
            isReply: req.body.commentObj.isReply,
            parentCommentId: req.body.commentObj.parentCommentId,
            postName: req.body.commentObj.filename,
            text: req.body.commentObj.text
        });
        res.status(200).json({
            status: "success",
            message: "Comment posted successfully!",
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.post('/get-all-comments', async (req, res) => {
    try {
        const comments = await Comment.find({
            isReply: false,
            postName: req.body.data.postName
        });
        res.status(200).json({
            status: "success",
            comments
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error
        });
    }
});

app.post('/get-all-replies-to-a-comment', async (req, res) => {
    try {
        const replies = await Comment.find({
            isReply: true,
            parentCommentId: req.body.data.parentCommentId
        });
        res.status(200).json({
            status: "success",
            replies
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

/**
 * Collection posts
 */
 app.get('/get-all-posts', async (req, res) => {
    try {
        const posts = await Post.find();
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

app.post('/get-post-by-name', async (req, res) => {
    try {
        const post = await Post.find({
            'name': req.body.data.name
        });
        res.status(200).json({
            status: "success",
            post,
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
        const posts = await Post.find({
            'author.username': req.body.user.username
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

app.post('/update-post-decrease-likes', async (req, res) => {
    try {
        let postId = req.body.post.postId;
        let username = req.body.post.username;

        const filter = { _id: postId };
        const update = { $inc : {'likes.count' : -1},
                         $pull : {'likes.users' : username}
        };

        let doc = await Post.findOneAndUpdate(filter, update);
        doc = await Post.findOne(filter);
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

app.post('/update-post-increase-likes', async (req, res) => {
    try {
        let postId = req.body.post.postId;
        let username = req.body.post.username;

        const filter = { _id: postId };
        const update = { $inc : {'likes.count' : 1},
                         $push : {'likes.users' : username}
        };

        let doc = await Post.findOneAndUpdate(filter, update);
        doc = await Post.findOne({name: postName});
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

/**
 * Collection users
 */
 app.post('/delete-user', async (req, res) => {
    try {
        await User.deleteOne({ email: req.body.user.email,
                               username: req.body.user.username,
                               password: req.body.user.password });
        res.status(200).json({
            status: "success"
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error
        });
    }
});

app.get('/get-all-users', async (req, res) => {
    try {
        const users = await User.find();
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