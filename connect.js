var mysql=require('mysql');
const util=require('util');
var fs=require('fs');
var formidable=require('formidable');
var actions=require('./mkdir.js')
var con;
function connection(){
    con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"VIDYALAY"
    });
    con.connect(function(err){
        if(err) throw err;
        console.log("connected");
    })
}
function response(s){
    return new Promise(function(resolve,reject){
        con.query(s,function(err,result,fields){
            if(err){return reject(err);}
            resolve(result);
        })
    })
}
function valid(name,password,res){
    var s="SELECT * FROM users WHERE username = "+"'"+name+"'";
    response(s)
        .then((result)=>{
            if(result[0].password==password)
            console.log("valid");
            if(name=='admin')
                res.redirect('/admin_home');
            else
                res.redirect("/"+result[0].id+"/"+name+"/home")
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function professors(res){
    var s="SELECT name,id FROM professors";
    var l=[];
        id=[];
    response(s)
        .then((result)=>{
            for(var i=0;i<result.length;i++){
                l.push(result[i]["name"]);
                id.push(result[i]["id"]);}
            res.render('add_course',{
                name:l,
                id:id
            });
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function add_course(req,res){
    var x=req.body;
    var s="INSERT INTO courses (id,name,professor,skills,about,type) VALUES("+"'"+x['courseid']+"',"+"'"+x['username']+"',"+"'"+x['professor']+"',"+"'"+x['skills']+"',"+"'"+x['about']+"',"+"'"+x['type']+"')";
    response(s)
        .then(()=>{
            actions.createDir('/public/course_material/'+x['courseid'])
            res.render('success')
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function add_student(req,res){
    var x=req.body;
    var s="INSERT INTO students (name,mailid,password,gender,mobile,qualification,organization,al1,al2,city,state,zip) VALUES("+"'"+x['name']+"',"+"'"+x['mailid']+"',"+"'"+x['password']+"',"+"'"+x['gender']+"',"+"'"+x['mobile']+"',"+"'"+x['qualification']+"',"+"'"+x['organization']+"',"+"'"+x['al1']+"',"+"'"+x['al2']+"',"+"'"+x['city']+"',"+"'"+x['state']+"',"+"'"+x['zip']+"')";
    response(s)
        .then(()=>
        {
            s="INSERT INTO users (username,password) VALUES("+"'"+x['mailid']+"',"+"'"+x['password']+"')";
            response(s)
                .then(()=>{
                    res.render('success')
                })
                .catch((err)=>{throw err})
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function signup(req,res){
    var x=req.body;
    var s="INSERT INTO students (name,mailid,password,gender,mobile,qualification,organization,al1,al2,city,state,zip) VALUES("+"'"+x['name']+"',"+"'"+x['mailid']+"',"+"'"+x['password']+"',"+"'"+x['gender']+"',"+"'"+x['mobile']+"',"+"'"+x['qualification']+"',"+"'"+x['organization']+"',"+"'"+x['al1']+"',"+"'"+x['al2']+"',"+"'"+x['city']+"',"+"'"+x['state']+"',"+"'"+x['zip']+"')";
    response(s)
        .then(()=>{
            s="INSERT INTO users (username,password) VALUES("+"'"+x['mailid']+"',"+"'"+x['password']+"')";
            response(s)
                .then(()=>{
                    s="SELECT * FROM users WHERE username = "+"'"+x['mailid']+"'"
                    response(s)
                        .then((result)=>
                        {
                            res.redirect("/"+result[0].id+"/"+x['name']+"/home")
                        })
                })
                .catch((err)=>{throw err})
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function show_courses(res,sid){
    var s="SELECT * FROM courses";
    var name=[];
        id=[];
        pid=[];
    response(s)
        .then((result)=>{
            for(var i=0;i<result.length;i++){
                name.push(result[i]['name']);
                id.push(result[i]['id']);
                pid.push(result[i]['professor'])
            }
            res.render('courses',{
            name:name,
            id:id,
            sid:sid,
            pid:pid
            })
            
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        });
}
function show_mycourses(id,res){
    var s="SELECT c_id FROM stud_cour WHERE s_id='"+id+"'";
    var l=[]
    response(s)
        .then((result)=>{
            if(result.length==0){
                res.render('my_courses',{
                    details:0
                })}
            else{
                for(var i=0;i<result.length;i++)
                    var c_id=result[i]['c_id']
                    s="SELECT name,professor FROM courses WHERE id='"+c_id+"'";
                    response(s)
                        .then((result)=>{
                            for(var i=0;i<result.length;i++){
                                var x={
                                    name:result[i]['name'],
                                    professor:result[i]['professor'],
                                    id:c_id
                                }
                                l.push(x)
                            }
                            return l
                        })
                        .catch((err)=>{
                            console.log("error");
                            throw err;
                        })
                        .then((data)=>{
                            res.render('my_courses',{
                                details:data
                            })
                        });
        }})
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function add_crs_4_stud(res,sid,cid,pid){
    var s="INSERT INTO stud_cour (s_id,c_id,p_id) VALUES("+"'"+sid+"',"+"'"+cid+"',"+"'"+pid+"')";
    response(s)
        .then(()=>res.render('success'))
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function view_student(id,res,name){
    var s="SELECT * FROM students WHERE id='"+id+"'";
    response(s)
        .then((result)=>{
            var x=result[0];
            res.render("home",{
                id:x['id'],
                name:x['name'],
                mailid:x['mailid'],
                mobile:x['mobile'],
                qualification:x['qualification'],
                organization:x['organization'],
                al1:x['al1'],
                al2:x['al2'],
                city:x['city'],
                state:x['state'],
                zip:x['zip']
            })})
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function explore(res){
    var s="SELECT * FROM courses";
    var name=[];
        id=[];
        l=[];
    response(s)
        .then((result)=>{
            for(var i=0;i<result.length;i++){
                name.push(result[i]['name']);
                id.push(result[i]['id']);
            }  
            return {
                name:name,
                id:id};
        })
        .then((data)=>
        {
            s="SELECT name FROM professors";
            response(s)
                .then((result)=>{
                    for(var i=0;i<result.length;i++)
                        l.push(result[i]["name"])
                    res.render('explore',{
                        name:data.name,
                        id:data.id,
                        l:l
                    })
                })
                .catch((err)=>{
                    console.log("error");
                    throw err;
                });
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        });
}
function exp_filter(type,instructor,res){
    var s="";
    var name=[];
    var id=[];
    if(type=="all" && instructor=="all")
        explore(res);
    else if(instructor=="all"){
        s="SELECT * FROM courses WHERE type = "+"'"+type+"'";
        response(s)
        .then((result)=>{
            for(var i=0;i<result.length;i++){
                name.push(result[i]['name']);
                id.push(result[i]['id']);
            }
            res.render('explore',{
            name:name,
            id:id
            })
            
        })
    }
    else if(type=="all"){
        s="SELECT id FROM professors WHERE name = "+"'"+instructor+"'";
        response(s)
            .then((result)=>{
                s="SELECT * FROM courses WHERE professor = "+"'"+result[0]['id']+"'";
                response(s)
                .then((result)=>{
                    console.log(result)
                    for(var i=0;i<result.length;i++){
                        name.push(result[i]['name']);
                        id.push(result[i]['id']);
                    }
                    res.render('explore',{
                    name:name,
                    id:id
                    })
                    
                })
            })
    }
    else{
        s="SELECT id FROM professors WHERE name = "+"'"+instructor+"'";
        response(s)
            .then((result)=>{
            s="SELECT * FROM courses WHERE professor = "+"'"+result[0]['id']+"'"+"AND type = "+"'"+type+"'";
            response(s)
            .then((result)=>{
                for(var i=0;i<result.length;i++){
                    name.push(result[i]['name']);
                    id.push(result[i]['id']);
                }
                res.render('explore',{
                name:name,
                id:id
                })
                
            })
        })
    }
}
function add_professor(req,res){
    var x=req.body;
    console.log(x)
    var s="INSERT INTO professors (name,mailid,password,gender,mobile,type,organization,al1,al2,city,state,zip) VALUES("+"'"+x['name']+"',"+"'"+x['mailid']+"',"+"'"+x['password']+"',"+"'"+x['gender']+"',"+"'"+x['mobile']+"',"+"'"+x['field']+"',"+"'"+x['organization']+"',"+"'"+x['al1']+"',"+"'"+x['al2']+"',"+"'"+x['city']+"',"+"'"+x['state']+"',"+"'"+x['zip']+"')";
    response(s)
        .then(()=>{
            s="INSERT INTO users (username,password) VALUES("+"'"+x['mailid']+"',"+"'"+x['password']+"')";
            response(s)
                .then(()=>{
                    res.render('success')
                })
                .catch((err)=>{throw err})
        })
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function valid_professor(res,x){
    var s="SELECT * FROM professors WHERE mailid = "+"'"+x.name+"'";
    response(s)
        .then((result)=>{
            if(result[0].password==x.password){
            console.log("valid");
            res.redirect("/instructor/"+result[0].id+"/"+x.name+"/home")
            }
            })
        .catch((err)=>{
            console.log("error");
            throw err;
        })

}
function view_professor(id,res,name){
    var s="SELECT * FROM professors WHERE id='"+id+"'";
    response(s)
        .then((result)=>{
            var x=result[0];
            res.render("faculty_home",{
                id:x['id'],
                name:x['name'],
                mailid:x['mailid'],
                mobile:x['mobile'],
                qualification:x['type'],
                organization:x['organization'],
                al1:x['al1'],
                al2:x['al2'],
                city:x['city'],
                state:x['state'],
                zip:x['zip']
            })})
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function my_students(id,res){
    var s="SELECT s_id FROM stud_cour WHERE p_id='"+id+"'";
    var l=[];
    response(s)
        .then((result)=>{
            if(result.length==0){
                res.render('my_students',{
                    details:0
                })}
            else{
                for(var i=0;i<result.length;i++){
                    var s_id=result[i]['s_id']
                    s="SELECT name,mailid,qualification FROM students WHERE id='"+s_id+"'";
                    response(s)
                        .then((result)=>{
                            for(var i=0;i<result.length;i++){
                                var x={
                                    name:result[i]['name'],
                                    mailid:result[i]['mailid'],
                                    qualification:result[i]['qualification']
                                }
                                l.push(x)
                            }
                            return l;
                        })
                        .catch((err)=>{
                            console.log("error");
                            throw err;
                        })
                        .then((data)=>{
                            res.render('my_students',{
                                details:l
                            })
                        });
                    }
                }
            })
}
function inst_mycourses(id,res){
    var s="SELECT c_id FROM stud_cour WHERE p_id='"+id+"'";
    var l=[]
    response(s)
        .then((result)=>{
            if(result.length==0){
                res.render('my_courses',{
                    details:0
                })}
            else{
                for(var i=0;i<result.length;i++)
                    var c_id=result[i]['c_id']
                    s="SELECT name FROM courses WHERE id='"+c_id+"'";
                    response(s)
                        .then((result)=>{
                            for(var i=0;i<result.length;i++){
                                var x={
                                    name:result[i]['name'],
                                    id:c_id
                                }
                                l.push(x)
                            }
                            return l
                        })
                        .catch((err)=>{
                            console.log("error");
                            throw err;
                        })
                        .then((data)=>{
                            res.render('instructor_mycourses',{
                                details:l
                            })
                        });
        }})
        .catch((err)=>{
            console.log("error");
            throw err;
        })
}
function fileupload(req,id,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var oldpath=files.content.path;
        var newpath='C:/Users/Athira.V.Ajit/Desktop/vidyalay/public/course_material/'+id+'/'+files.content.name;
        fs.rename(oldpath,newpath,function(err){
            if(err) throw err;
            res.render('success');
        })
    })
}
var connection={
    connection:connection,
    valid:valid,
    professors:professors,
    add_course:add_course,    
    add_student:add_student,
    show_courses:show_courses,
    show_mycourses:show_mycourses,
    c4s:add_crs_4_stud,
    view_student:view_student,
    signup:signup,
    explore:explore,
    exp_filter:exp_filter,
    add_professor:add_professor,
    valid_professor:valid_professor,
    view_professor:view_professor,
    my_students:my_students,
    inst_mycourses:inst_mycourses,
    fileupload:fileupload
}
module.exports=connection;