module.exports=(req,res)=>{
    console.log(req.url);
    let index=req.url.split("/")[3];
    let movies=req.movies;
    let baseUrl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    console.log(baseUrl);

    if(req.url==="/api/movies"){
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(baseUrl==="/api/movies/" && index){
        let selectedMovie=movies.filter((movie)=>{
            return movie.id==index;
        })
        if(selectedMovie.length){
            
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify(selectedMovie));
            res.end();

        }else{
            res.writeHead(404,{"Content-type":"application/json"});
            res.end(JSON.stringify({title:"Not Found",message:"Product Not found"}));
        }
        

    }
    else{

        res.writeHead(404,{"Content-type":"application/json"});
        res.end(JSON.stringify({title:"Not Found",message:"Route Not found"}));
    }
};