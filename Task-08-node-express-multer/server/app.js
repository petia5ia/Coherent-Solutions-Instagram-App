const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());                         //To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //To support URL-encoded bodies
app.use(cors());

//Use this to check if the server is working
app.get('/', (req, res)=>{
    res.send("Welcome to your server");
});

//Start the server on a specified port
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
});

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

app.post('/upload-profile-pic', (req, res) => {
    const upload = multer({ storage: storage }).single('profile_pic');

    upload(req, res, function(err) {
        //req.body contains information of text fields, if there were any
        //req.file contains information of uploaded file
        //console.log(req.body);
        console.log(req.file);

        res.json({ message: 'Successfully uploaded file.',
                   filename: `${req.file.filename}`,
                   path: `${req.file.path}` });
    });
});

app.get('/uploads/*', (req, res) => {
    const url = req.originalUrl;
    const parsedUrl = url.split('/');
    const profilePicFile = parsedUrl[2];

    res.sendFile(path.join(__dirname, `./uploads/${profilePicFile}`));
});
