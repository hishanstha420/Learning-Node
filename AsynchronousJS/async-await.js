
console.log('Before');
//Promise approach
//Consume promise
// getUser(1)
//     .then(user=>getRepositories(user.gitHubUserName))//consuming getusername promise
//     .then(repos=>getCommits(repos[0]))//consuming getreposositories promise
//     .then(commits=>console.log(commits))//consuming getcommit promise 
//     .catch(err=>console.log('Error',err.message));//throwing error message if error detected

//Async and Await Approach->lets u write asynchronous code like synchronous code

async function displayCommits() {
    try {
        const user=await getUser(1);
        const repos= await getRepositories(user.gitHubUserName);
        const commits= await getCommits(repos[0]);
        console.log(commits);
        
    } catch (error) {
        console.log('Error',error.message);
    }
    
    
}
displayCommits();
//Only looks like synchronous internally uses promises



console.log('After');


function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading from a database ....');
            resolve({id: id, gitHubUserName:"mosh"});
        },2000);
    });
    
}


function getRepositories(username)
{
    return new Promise((resolve,reject)=>{
    setTimeout(()=>
    {
        console.log("Calling github Api");
        //resolve( ['repo1','repo2', 'repo3']);
        reject(new Error('Couldnt get repos'));
    },2000);
});
}

function getCommits(repos)
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
        {
            console.log('Loading commits');
            resolve({commit1:"1st Commit",commit2:"2nd Commit"});
        },2000);
    });

   
}