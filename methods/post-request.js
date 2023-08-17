const bodyparser=require('../util/body-parser');
const writetofile=require('../util/write-to-file');

module.exports=async (req,res)=>{

    if(req.url='/api/movies'){
        try{
            let body=await bodyparser(req);
            body.id=req.movies.length;
            req.movies.push(body);
            console.log("request",body);
            writetofile(req.movies);
            res.writeHead(201,{
                "Content-Type":"application/json"
            })

            res.end();
        }catch(err){
            console.log(err);
        }
    }

};