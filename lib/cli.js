/*
 * CLI-Related tasks
 *
 */


 // Dependencies
 var readline = require('readline');
 var events = require('events');
 var _data = require('./data');
 var genericHelper = require('./helpers/generic')

 class _events extends events{};
 var e = new _events();

 // Instantiate the CLI module object
 var cli = {};

 // Input handlers
 e.on('man', function(str){
   cli.responders.help();
 });

 e.on('help', function(str){
   cli.responders.help();
 });

 e.on('exit', function(str){
   cli.responders.exit();
 });

 e.on('show menu', function(str){
   cli.responders.listMenu();
 });

 e.on('show orders', function(str){
   cli.responders.listOrders();
 });

 e.on('more order info', function(str){
   cli.responders.moreOrderInfo(str);
 });

 e.on('show users', function(str){
   cli.responders.listUsers(str);
 });

 e.on('more user info', function(str){
   cli.responders.moreUserInfo(str);
 });

 // Responders object
 cli.responders = {};

 // Help / Man
 cli.responders.help = function(){
   var commands = {
     'exit': 'Kill the CLI (and the rest of the application)',
     'man': 'Show this help page',
     'help': 'Alias of the "man" command',
     'show menu': 'Show all the current menu items',
     'show orders': 'Show all the recent orders in the system (placed in the last 24h)',
     'more order info --{orderId}': 'Show details of a specific order',
     'show users': 'Show all the users who have signed up in the last 24h',
     'more user info --{emailAddress}': 'Show details of a specific user by email address'
   };

   // Show a header for the help page that is as wide as the screen
   cli.horizontalLine();
   cli.centered('CLI MANUAL');
   cli.horizontalLine();
   cli.verticalSpace(2);

   // Show each command, followed by its explanation, in white and yellow respectively
   for(var key in commands){
     if(commands.hasOwnProperty(key)){
       var value = commands[key];
       var line = '\x1b[33m'+key+'\x1b[0m';
       var padding = 60 - line.length;
       for(i = 0; i < padding; i++){
         line+=' ';
       }
       line+=value;
       console.log(line);
       cli.verticalSpace();
     }
   }

   cli.verticalSpace(1);

   // End with another horizontalLine
   cli.horizontalLine();
 };

 // Exit
 cli.responders.exit = function(){
   process.exit(0);
 };

 cli.responders.listMenu = function(){
   _data.list('menuitems', function(err, menuItems){
     if(!err && menuItems && menuItems.length > 0){
       cli.verticalSpace();
       menuItems.forEach(function(menuItem){
         _data.read('menuitems', menuItem, function(err, menuItemData){
           if(!err && menuItemData){
             var line = 'Id: ' + menuItemData.id + '\nName: ' + menuItemData.name + '\nDisplayName: ' +
             menuItemData.displayName + '\nPrice: ' + menuItemData.price + '\nDescription: ' + menuItemData.description + '\nImageSrc: ' + menuItemData.imageSrc;

             console.log(line);
             cli.verticalSpace();
           }
         });
       });
     }
   });
 };

 cli.responders.listOrders = function(){
   _data.list('orders', function(err, orders){
     if(!err && orders && orders.length > 0){
       cli.verticalSpace();
       orders.forEach(function(order){
         _data.read('orders', order, function(err, orderData){
           if(!err && orderData && (orderData.order_time > (Date.now() - (1000 * 60 * 60 * 24)))){
             var line = 'Id: ' + orderData.id + '\nUserId: ' + orderData.userId + '\nTotal Price: ' + orderData.totalPrice  + '\nOrder Date: ' + new Date(orderData.order_time).toString();
             console.log(line);
             cli.verticalSpace();
           }
         });
       });
     }
   });
 };

 cli.responders.moreOrderInfo = function(str){
   // Get the ID from the string
   var arr = str.split('--');
   var orderId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
   if(orderId){
     // Lookup the user
     _data.read('orders', orderId, function(err, data){
       if(!err && data){
         // Print the JSON with text highlighting
         cli.verticalSpace();
         console.dir(data, {'colors': true});
         cli.verticalSpace();
       }
     })
   }
 };

 cli.responders.listUsers = function(){
   _data.list('users', function(err, users){
     if(!err && users && users.length > 0){
       cli.verticalSpace();
       users.forEach(function(user){
         _data.read('users', user, function(err, userData){
           if(!err && userData && (userData.signedup_time > (Date.now() - (1000 * 60 * 60 * 24)))){
             var line = 'Id: ' + userData.id + '\nName: ' + userData.name + '\nEmail Address: ' + userData.emailAddress  + '\nSignup Date: ' + new Date(userData.signup_time).toString() + '\n#Orders: ' + (userData.orders instanceof Array && userData.orders.length > 0 ? userData.orders.length : 0) + '\n#Shopping Cart: ' + (userData.shoppingcart instanceof Array && userData.shoppingcart.length > 0 ? userData.shoppingcart.length : 0);
             console.log(line);
             cli.verticalSpace();
           }
         });
       });
     }
   });
 };

 cli.responders.moreUserInfo = function(str){
   // Get the ID from the string
   var arr = str.split('--');
   var emailAddress = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
   if(emailAddress){
     // Lookup the user by emailAddress (we need to hash the email address to get the userIdentifier)
     var userIdentifier = genericHelper.hash(emailAddress);
     _data.read('users', userIdentifier, function(err, userData){
       delete userData.hashedPassword;
       if(!err && userData){
         // Print the JSON with text highlighting
         cli.verticalSpace();
         console.dir(userData, {'colors': true});
         cli.verticalSpace();
       }
     })
   }
 };


 // Create a vertical space
 cli.verticalSpace = function(lines){
   lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
   for(i = 0; i < lines; i++){
     console.log('');
   }
 };

 // Create a horizontalLine across the screen
 cli.horizontalLine = function(){
   // Get the available screen size
   var width = process.stdout.columns;
   var line = '';
   for(i = 0; i < width; i++){
     line+= '-';
   }
   console.log(line);
 };

 // Create centered text on the screen
 cli.centered = function(str){
   str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

   // Get the available screen size
   var width = process.stdout.columns;

   // Calculate the left padding there should be
   var leftPadding = Math.floor((width - str.length) / 2);

   // Put in left padded spaces before the string itself
   var line = '';
   for(i = 0; i < leftPadding; i++){
     line+= ' ';
   }
   line+=str;
   console.log(line);
 };

 // Input processor
 cli.processInput = function(str){
   str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
   // Only process the input if the user actually wrote something. Otherwise ignore it.
   if(str){
     // Codify the unique strings that identify the unique questions allowed to be asked
     var uniqueInputs = [
       'man',
       'help',
       'exit',
       'show menu',
       'show orders',
       'more order info',
       'show users',
       'more user info'
     ];

     // Go through the possible inputs, emit an event when a match is found
     var matchFound = false;
     var counter = 0;
     uniqueInputs.some(function(input){
       if(str.toLowerCase().indexOf(input) > -1){
         matchFound = true;
         // Emit an event matching the unique input, and include the full string given by the user
         e.emit(input, str);
         return true;
       }
     });

     // If no match is found, tell the user to try again
     if(!matchFound){
       console.log("Sorry, try again");
     }

   }
 }

 // Init script
 cli.init = function(){
    // Send the start message to the console, in dark blue
    console.log('\x1b[34m%s\x1b[0m', "The CLI is running");

    // Start the interface
    var _interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input separately
    _interface.on('line', function(str){
      // Send to the input processor
      cli.processInput(str);

      // Re-initialize the prompt afterwards
      _interface.prompt();
    });

    // If the user stops the CLI, kill the associated process
    _interface.on('close', function(){
      process.exit(0);
    });
 };

 // Export the module
 module.exports = cli;
