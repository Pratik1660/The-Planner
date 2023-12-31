//require the libary
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/task_list_db');

//aquire the connection
const db=mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function(){
    console.log('successfully connected to the database')
})