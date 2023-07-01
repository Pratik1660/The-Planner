//creating database schema
const mongoose=require ('mongoose');
const taskSchema = new mongoose.Schema({
    task: { type: String,
        required: true}, 
    supervisor: {type: String,
            required:true}
});

const Task= mongoose.model ('task', taskSchema); //Contact is name of collection and contactSchema is name of schema

module.exports = Task; //export contact