const EventEmitter= require('events');
var url="http://mylogger.io/log";

class Logger extends EventEmitter 
{
    log=(message)=>
    {
    
        console.log(message);    
        this.emit('logging',{data: message});
    }

}
 
module.exports=Logger;


