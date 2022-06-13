//synchronous ->blocking program (euta run vayae paxi matra arko run hunxa)
//Asynchronous
console.log('Before');

getUser(1,(user)=>{
    // console.log('User',user);
    getRepositories(user.gitHubUsername,(repos)=>{
        console.log("Repos",repos);
        getCommits(repos,(commits)=>{
            //CALLBACK HELL
            //nested xa dherai 
        });
    });
});

console.log('After');

//Synchronous

// console.log('before');
// const user=getUser(1);
// const repos=getRepositories(user.gitHubUserName);
// const commits=getSelection(repos[0]);



//Callback function=> call when async operation is ready
function getUser(id, callback){
    setTimeout(()=>{
    console.log('Reading from a database ....');
    callback({id: id, gitHubUserName:"mosh"});
},2000);
}


function getRepositories(username,callback)
{
    setTimeout(()=>
    {
        console.log("Calling github Api");
        callback( ['repo1','repo2', 'repo3']);
    },2000);
    
}

function getCommits(repos,callback)
{
    setTimeout(()=>
    {
        callback({commit1:"1st Commit",commit2:"2nd Commit"});
    },2000);
}