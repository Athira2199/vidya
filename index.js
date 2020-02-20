var express=require("express");
var Router= require('router');
var router=Router();
var app=express();
var formidable=require('formidable');
var connection=require("./connect.js");
var methods=require("./find_files.js")
var demo=require("./news.js")
connection.connection();
app.use(express.urlencoded())
app.use(express.static('./public'))
app.set('view engine','pug');
app.set('views','./views');
app.get('/',function(req,res){
    res.render('index')
});
app.get('/admin' ,function(req,res){
    res.render('login')
});
app.get('/signup',function(req,res){
    res.render('sign_up')
})
app.post('/signup/submit',function(req,res){
    connection.signup(req,res);
})
app.get('/login' ,function(req,res){
    res.render('login')
});
app.post('/log',function(req,res){
    connection.valid(req.body.name,req.body.password,res);
})
app.get('/explore',function(req,res){
    connection.explore(res);
})
app.get('/filter',function(req,res){
    //console.log();
    var type=req.query.type;
    var instructor=req.query.instructor;
    connection.exp_filter(type,instructor,res);
})
app.get('/faq',function(req,res){
    demo.faq(res)
})
app.get('/:id/:name/home',function(req,res){
    connection.view_student(req.params.id,res,req.params.name);
})
app.get('/admin_home',function(req,res){
    res.render('admin_home')
})
app.get('/courses',function(req,res){
    connection.show(res);
})
app.get('/:id/courses',function(req,res){
    connection.show_courses(res,req.params.id);
})
app.get('/:sid/:cid/:pid/add',function(req,res){
    console.log(req.params);
    connection.c4s(res,req.params.sid,req.params.cid,req.params.pid)
})
app.get('/:id/mycourses',function(req,res){
    connection.show_mycourses(req.params.id,res);
})
app.get('/admin/add/course',function(req,res){
    connection.professors(res);
})
app.get('/add/news',function(req,res){
    demo.add(req.query.news,res);
})
app.get('/admin/news',function(req,res){
    demo.print(res)
})
app.get('/news/:name',function(req,res){
    demo.print_user(req.params.name,res)
})
app.get('/del/news/:id',function(req,res){
    demo.remove(req.params.id,res);
})
app.post('/add/course/submit',function(req,res){
    console.log(req.body);
   connection.add_course(req,res);
})
app.get('/admin/add/student',function(req,res){
    res.render('add_student')
})
app.post('/add/student/submit',function(req,res){
    connection.add_student(req,res);
})
app.get('/admin/add/professor',function(req,res){
    res.render('add_professor')
})
app.post('/admin/professor/submit',function(req,res){
    connection.add_professor(req,res);
})
//faculty login 
app.get('/instructor',function(req,res){
    res.render('login_instructor')
})
app.post('/instructor/log',function(req,res){
    connection.valid_professor(res,req.body)
})
app.get('/instructor/:id/:name/home',function(req,res){
    connection.view_professor(req.params.id,res,req.params.name)
})
app.get("/instructor/:id/mystudents",function(req,res){
    connection.my_students(req.params.id,res)
})
app.get("/instructor/:id/mycourses",function(req,res){
    connection.inst_mycourses(req.params.id,res)
})
app.post("/instructor/add/:id",function(req,res){
    connection.fileupload(req,req.params.id,res)
})
app.get("/info/:id",function(req,res){
    x=methods.readfile('public/course_material/'+req.params.id)
    res.render('course_details',{
        cd:'C:/Users/Athira.V.Ajit/Desktop/vidyalay/public/course_material',
        files:x,
        id:req.params.id
    })
})
app.get("/info/download/C:/Users/Athira.V.Ajit/Desktop/vidyalay/public/course_material/:id/:val",function(req,res){
    res.download(req.path.substring(15))
})
app.listen(3000);
