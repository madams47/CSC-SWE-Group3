const database = require('../database');

// Should add a field to the database to store a counter for work item
// ID generation. 

// Work Item ID generation algorithm should look like:
// 	Manually initialize value in database to 10000 (this is the first ID)
// 	Server code query database for value, assign it to new work item
// 	Server code update value in database to be value+1
	

// exports.GenerateNextId = function(){
//     var id = database.getIdCounter();
//     database.incrementIdCounter();
//     return id;
// }