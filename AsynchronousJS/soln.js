console.log('Before');
//Named function to rescue callback hell
getUser(1,displayUsername);
console.log('After');

function displayCommits(commits){
    console.log(commits);
}

function displayRepositories(repos){
    console.log(repos);
    getCommits(repos,displayCommits);
}

function displayUsername(user){
    console.log(user);
    getRepositories(user.gitHubUsername,displayRepositories);
}

function getUser(id, callback){
    setTimeout(()=>{
    console.log('Reading from a database ....');
    callback({id: id, gitHubUserName:"mosh"});
},2000);
}


function getRepositories(username,callback)
{
    setTimeout(()=>{
        callback(['repo1','repo2','repo3']);
    },2000);   
}
function getCommits(repos,callback)
{
    setTimeout(()=>
    {
        callback({commit1:"1st Commit",commit2:"2nd Commit"});
    },2000);
}

