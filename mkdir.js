const fs=require("fs");
const createDir=(dirPath)=>{
    fs.mkdirSync(process.cwd()+dirPath,{recursive:true},(error)=>{
        if(error){
            console.log('an error occured',error)
        }
        else{
            console.loog('your directry is made!');
        }
    })
}
const actions={
    createDir:createDir
}
module.exports=actions;
