//PROMISES
//object that holds eventual result of an asynchronous operation

const p =new Promise((resolve,reject)=>
{
    //Kick off some async work
    //..
    setTimeout(()=>{
//        resolve(1);//pending=>resolved, fulfilled
        reject(new Error('message'));//pending=>rejected 
    },2000);
   
    
});


//consume promise
//promise has 2 methods catcha and then
p
    .then(result=>console.log('Result',result))
    .catch(err=>console.log('Error',err.message));
 