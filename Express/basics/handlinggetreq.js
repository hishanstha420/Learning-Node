const express= require('express');
const app= express();

const courses=[
    {id:1 ,name:'course1'},
    {id:2 ,name:'course2'},
    {id:3 ,name:'course3'},
]



app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    // res.send(req.params.id);
    
    const course=courses.find(c=> c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with id not found');
    
    res.send(course);
    

});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});

const port=process.env.PORT ||3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}... `)
});