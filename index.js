//fireup the server

const express = require('express');
const path=require('path');
const app = express();
const port = 8000;

//connecting to the mongodb using mongoose
const db=require('./config/mongoose');

const Task=require('./models/task')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets')); //setup static file

var taskList=[];

app.get('/', function(req,res){
    //console.log('from the Get route controller', req.myName);
    
    //fetching data from DB
    Task.find({})
    
        .then((tasks)=>{
            return res.render('home', {title:'Task List', tasklength:tasks.length , taskchecked:0, task_list: tasks});
        })
        .catch ((err)=>{console.log('Error in fetching contacts from db');
    return;});
        
});


app.post('/create-tasklist', function(req,res){
    
    Task.create({
        task: req.body.task,
        supervisor:req.body.supervisor,
    })
    .then((newTask)=>{console.log('*****', newTask);
    return res.redirect('back'); }) 
    .catch((err)=>{console.log('error in creating a task');
    return;}) ;
}) ;
    
  
//for deleting a contact
app.get('/delete-task', function(req,res){   
    //get the id from query in the url
    let id= req.query.id;
    
    //find the contact in the database using id and delete
    Task.findByIdAndDelete(id)
        .catch((err)=>{console.log('error in deleting an object from database');
        return;})
       
        .then(()=>{return res.redirect('back');
        })

});  



app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('YUP! My express server is running on port:', port);

});

