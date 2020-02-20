var fs=require('fs')
var obj=[]
var util=require("util")
const readFile=util.promisify(fs.readFile)
function remove(id,res){
    const promise=readFile('./public/news.json')
    promise
        .then((data)=>{
            return(JSON.parse(data))})
        .then((data)=>{
            data=data.filter(function(e){
                return e.id!=id;
            })
            return(data)
        })
        .then((data)=>{
            write(data)
        })
        .then(()=>{
            res.redirect('/admin/news')
        })
        .catch((err)=>{
            console.log(err)
        })
}
function write(data){
        json = JSON.stringify(data); 
        fs.writeFileSync('./public/news.json', json)
}
function add(msg,res){
    const promise=readFile('./public/news.json')
    promise
        .then((data)=>{
            return(JSON.parse(data))
        })
        .then((data)=>{
            for(var i=0;i<data.length;i++)
                data[i]['id']=i+1
            data.push({'id':data.length+1,'news':msg})
            return data;
        })
        .then((data)=>{
            write(data)
        })
        .then(()=>{
            res.redirect('/admin/news')
        })
        .catch((err)=>{
            console.log(err)
        })
}
function print(res){
    readFile('./public/news.json')
        .then((data)=>{
            res.render('news',{
                details:JSON.parse(data)
            })
        })
}
function print_user(name,res){
    readFile('./public/news.json')
        .then((data)=>{
            res.render('view_news',{
                details:JSON.parse(data),
                name:name
            })
        })
}
function faq(res){
    readFile('./public/faq.json')
        .then((data)=>{
            res.render('faq',{
                faq:JSON.parse(data)
            })
        })
}
var demo={
    print:print,
    write:write,
    add:add,
    remove:remove,
    print_user:print_user,
    faq:faq
}
module.exports=demo;
