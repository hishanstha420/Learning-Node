const os =require('os');
var totalMemory=os.totalmem();
var freeMemory=os.freemem();
var osName=os.hostname();
var osUptime=os.uptime();
console.log('Total Memory:'+totalMemory+' Free memory:'+freeMemory);

console.log(`Free memory: ${freeMemory}`);
console.log(`Total Memory:${totalMemory}`);
console.log(`Host Name:${osName}`);
console.log(osUptime);