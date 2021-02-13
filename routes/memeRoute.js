const express = require('express');
var mongoose = require('mongoose');

const Memes = require('../models/mememodel');
const app = express.Router();


app.route('/')
.get((req,res)=>{
    Memes.find().sort({_id:-1}).limit(100)
    .then((meme)=>{
        console.log('successfully fetched top 100  latest memes ');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({meme,message:'fetched latest memes',status:'success'});
    }).catch((err)=>{
        console.log('failed to fetch all memes\n');
        console.log(err);
        res.statusCode=500;
        res.json({status:'fail',message:'some error occured try again'});
    })
})
.post((req,res)=>{
    Memes.find(req.body)
    .then((meme)=>{
        if(meme.length>0){
            res.statusCode=409;
            res.json({status:'fail',message:'duplicate post of meme not allowed'});
        }
        else{
                  Memes.create(req.body)
                  .then((Meme)=>{
                      console.log('successfully uploaded meme\n',{"id":Meme._id});
                      res.statusCode=200;
                      res.json({status:"success",message:"successfully posted your meme","id":Meme._id});
                  })
                  .catch((err)=>{
                      res.statusCode=500;
                      console.log(err);
                      res.json({status:'fail',message:'some error occured try again'});
                  });
        }
    }).catch((err)=>{
        res.statusCode=500;
        res.json({message:'error in find operation'});
        console.log(err);
    });
    
})
.put((req,res)=>{
    res.statusCode=405;
    res.setHeader('Content-Type','application/json');
    res.json({message:"put operation on supported on /memes"});
})
.delete((req,res)=>{
    res.statusCode=405;
    res.setHeader('Content-Type','application/json');
    res.json({message:"delete operation on supported on /memes"});
})

app.route('/:id')
.get((req,res)=>{
    Memes.findById(req.params.id)
    .then((meme)=>{
        if(meme==null){
            res.statusCode=404;
            res.json({status:'fail',message:'meme does not exists'});
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({meme,status:'success'});
    })
    .catch((err)=>{
        console.log(err);
        res.statusCode=500;
        res.json({status:'fail',message:'error in fetching the meme'});
    })
})
.patch((req,res)=>{
    const {name} = req.body;
    if(name){
        res.statusCode=406;
        res.json({status:'fail',message:"name cannot be updated"});
        return ;
    }
    Memes.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true,useFindAndModify:false})
    .then((meme)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:'success',message:'updated meme successfully',"url":meme.url,"caption":meme.caption});
    })
    .catch((err)=>{
        res.statusCode=500;
        console.log(err);
        res.json({status:'fail',message:'failed to update'});
    });
})
.post((req,res)=>{
    res.statusCode=405;
    res.setHeader('Content-Type','application/json');
    res.json({status:'fail',message:"post operation on supported on /memes/:id"});
})
.delete((req,res)=>{
    Memes.findByIdAndRemove(req.params.id,{useFindAndModify:false})
    .then(()=>{
        console.log('removed meme successfully');
        res.statusCode=200;
        res.json({status:'success',message:'deleted meme'});
    })
    .catch((err)=>{
        console.log('error in deleting meme');
        res.statusCode=500;
        res.json({status:'fail',message:'error in deleting meme'});
    });
});



module.exports=app;