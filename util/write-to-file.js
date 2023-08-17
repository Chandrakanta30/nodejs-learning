const fs=require("fs");
const path=require("path");

module.exports= (data)=>{
    try{
        console.log(data);

    fs.writeFileSync(
        path.join(
            __dirname,
            "..",
            "data",
            "movies.json" 
            ),
            JSON.stringify(data),
            "UTF-8"
        );

    }catch(error){
        console.log(error);
    }

}