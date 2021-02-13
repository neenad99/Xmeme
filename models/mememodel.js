const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
        }
    }
});

var Memes = mongoose.model('Meme',memeSchema);

module.exports = Memes;

