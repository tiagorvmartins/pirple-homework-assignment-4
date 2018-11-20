/*
 * Primary file for the API
 *
 */

 // Dependencies
 var server = require('./lib/server');
 var cli = require('./lib/cli');

 // Declare the app
 var app = {};

 // Init function
 app.init = function (){
   // Start the server
   const serverInit = server.init();
   serverInit.then(function(val){
      if(val != true){
        console.log(val);
      }else{
        // Since server was init with success let's launch the CLI
        cli.init();
      }
   });

   // promise.then(function(value){
   //   if(value){
   //     // Start the CLI
   //     console.log("vou lançar a CLI");
   //   }else{
   //     console.log("There was a problem launching the http/https server.");
   //   }
   // });


 }

 // Execute
 app.init();

 // Export the app
 module.exports = app;
