require('./models/db')
const express=require('express')
const app=express()
const addCourse=require('./models/addModel')
const mark=require('./models/markModel')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    addCourse.find().then((data)=>{
        res.render('home',{data:data})
    }).catch((err)=>{
        console.log(err)
    })
   
})
app.post('/add',(req,res)=>{
    console.log(req.body)
    const newCourse= new addCourse(req.body)
    newCourse.save().then((data)=>{
        console.log(data)
        res.redirect('/')
    }).catch((err)=>{
        console.log(err)
    })
    
})
app.get('/mark',(req,res)=>{
    var id=req.query.id;
    var name=req.query.name;
    res.render('mark',{id:id,name:name})

})
app.post('/marked',(req,res)=>{
    const newMark=new mark(req.body)
    .save().then((data)=>{
       res.redirect('/')
    }).catch((err)=>{
        console.log(err)
    })
})
app.get('/details',(req,res)=>{
    var id=req.query.id;
    var name=req.query.name;
    mark.find({courseId:id}).then((data)=>{
         var present=0,absent=0,total=0,parsent=0
        
        
        
        data.forEach((e)=>{
            if (e.mark==true) {
                present++;
            }
            else {
                absent++;
            }
            total++;
            parsent=present*100/total;

        })
        res.render('details',{data:data,p:present,a:absent,t:total,par:parsent,name:name})

    })

})
app.listen(3000,()=>{
    console.log('Server Connected')
})