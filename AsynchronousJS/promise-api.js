
// const p=Promise.resolve({id:1});
// p.then(result=>console.log(result));

// const p= Promise.reject(new Error('Reason for rejection'));//when rejecting promises always use error object
// p.catch(error=>console.log(error));

const p1= new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async operation1..');
        resolve(1);
    //    reject(new Error('Something went wrong'));
    },2000);
});

const  p2=new Promise((resolve)=>
{
    setTimeout(()=>{
        console.log('Async operation2..');
        resolve(2);
    },2000);
});

// Promise.all([p1,p2])
//     .then(result=>console.log(result))
//     .catch(err=>console.log('Error',err.message));

    Promise.race([p1,p2])//value of first fulfilled promise  is printed
    .then(result=>console.log(result))
    .catch(err=>console.log('Error',err.message));