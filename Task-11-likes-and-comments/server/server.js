//This file makes the connection with our server and database
const app = require('./app');
const mongoose = require('mongoose');

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});

//Connection string
const DB = "mongodb://localhost:27017/instagram";

mongoose.connect(
    DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        console.log(err ? err : "DB connected successfully");
    }
);

const port = 3000;

//Start the server on a specified port
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
});