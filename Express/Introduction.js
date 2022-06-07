const express= require('express');
const app= express();


app.get('/',(req, res)=>{
    res.send('Hello User');
});

app.get('/api/courses',(req,res)=>
{
    res.send([1,2,3,4,5]);
});

//Environment variable-> PORT
const port=process.env.PORT ||3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}... `)
});

//app.listen(3000,()=>console.log('listening to port 3000'));


