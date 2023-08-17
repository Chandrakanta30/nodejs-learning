const writetofile=require('../util/write-to-file');

module.exports=(req,res)=>{
    console.log(req.url);
    let index=req.url.split("/")[3];
    let movies=req.movies;
    let baseUrl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    if(baseUrl==="/api/movies/" && index){
       
        let movieindex=movies.findIndex((movie)=>{
            return movie.id==index;
        })
        if(movieindex===-1){
            res.writeHead(404,{"Content-type":"application/json"});
            res.end(JSON.stringify({title:"Not Found",message:"Product Not found"}));

        }else if(movieindex){
            

            req.movies.splice(movieindex,1);
            writetofile(req.movies);
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            // res.write(JSON.stringify(selectedMovie));
            res.end();

        }else{
            res.writeHead(404,{"Content-type":"application/json"});
            res.end(JSON.stringify({title:"Not Found",message:"Product Not found"}));
        }
    }

};