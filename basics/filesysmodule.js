const fs = require("fs");

//synchronous Form
// const files=fs.readdirSync('./');
// console.log(files);

//Asynchronous form==> Preferred

fs.readdir("../", function (err, files) {
  if (err) {
    console.log("Error message", err);
  } else console.log("result", files);
});
// fs.readdir('$',function(err,files)

// {
//     if (err) {
//         console.log('Error message',err);
//     }
//     else console.log('result',files);
// })
