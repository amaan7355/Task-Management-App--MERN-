const { model, Schema } = require('../connection');

const mySchema = new Schema({
    title : String,
    description : String,
    date : Date
});

module.exports =  model( 'task', mySchema );