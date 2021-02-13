const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose=require('mongoose');
const path=require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const MemeRoute = require('./routes/memeRoute');

const app = express();
const swaggerApp = express();
const port = process.env.PORT;
const swaggerPort=8080;
const url = process.env.LOCAL_MONGO_URI||'mongodb+srv://nani:8ZpmNvE4pFecSioI@xmeme.xdlub.mongodb.net/Xmeme?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
swaggerApp.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/memes',MemeRoute);

const swaggeroptions = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Meme API",
            version:"0.1.0",
            description:"This is a crud application to stream memes made with express and documented with swagger",
            contact:{
                name:"Neenad Kambli",
                email:"neenadkambli@gmail.com"
            }
        },
        servers:[
            {
                url:"http://localhost:8081",
                url:"http://localhost:8080"
            }
        ]
    },
    apis:["./models/swaggerdoc.js"]
}

const specs = swaggerJsDoc(swaggeroptions);

swaggerApp.use('/swagger-ui',swaggerUi.serve,swaggerUi.setup(specs,{explorer:true}))


mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{ // mongodb connection
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('failed to connect to mongodb\n',err);
});

const uipath = path.join(__dirname,'UI');
app.use(express.static(uipath));

app.get('/',(req,res)=>{
    res.sendFile(`${uipath}/templates/index.html`);
});


swaggerApp.listen(swaggerPort,()=>{  //swagger doc served on port 8080
    console.log('swagger doc up and running');
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
