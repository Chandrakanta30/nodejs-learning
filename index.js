const express=require("express");
const app=express();
const router=express.Router();
const port=5001;
const path=require("path");
const logge=require("morgan");
const multer=require("multer");

// const upload=multer({dest:"./public/upload"})
// const upload = multer({ storage: storage })

// built in middle wire
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/static",express.static(path.join(__dirname,"public")))
// application 
const logger=(req,res,next)=>{
    console.log(`${new Date} --- Request [${req.method}] [${req.url}]`)
    next();
}
app.use(logger);
app.use(logge("combined"));

// route lavel

const fakeauth=(req,res,next)=>{
    const authstatus=true;
    if(authstatus){
        console.log("user authstatus: ",authstatus);
        next();
    }else{
        res.status(401);
        throw new Error("User is not authorised");
    }
}
router.use(fakeauth);
app.use("/api/users",router);

const getUsers=(req,res)=>{
    res.json({message:"get all users"})
}

const createUser=(req,res)=>{
    res.json({message:"create all users"})
}
router.route("/").get(getUsers).post(createUser);

// error handing middle wire
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    res.status(statusCode);
    switch(statusCode){
        case 401:
            res.json({
                title:"Unauthorised",
                message:err.message
            });
            break;
        case 404:
            res.json({
                title:"Not Found",
                message:err.message
            });
            break;
        case 500:
            res.json({
                title:"Not Found",
                message:err.message
            });
            break;
        default:
            break;
    }
}

app.post("/uploads",upload.single("image"),(req,res,next)=>{

    console.log(req.file,req.body);
    res.send(req.file)
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});

})
app.all("*",(req,res)=>{
    res.status(404);
    throw new Error("Route not Found");

})

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})