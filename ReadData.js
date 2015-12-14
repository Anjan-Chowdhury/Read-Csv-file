var fs = require("fs");
var csv = require("fast-csv");
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/my_database_name';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('doctor');
     var count =-1;
     var records = new Array(); 
     var stream = fs.createReadStream("C:\\video\\doctordata.csv");
     
csv
 .fromStream(stream)
 .on("data", function(data){
  if(count>-1){
   var row = new Object();
    row.name = data[0];
    row.phone = data[1];
   //var jsndata=JSON.stringify(data);
   console.log(row);
   records[count]=row;
  }
   count++;
 
     //console.log(data,data.length);
 })
 .on("end", function(){
    collection.insert(records, function (err,records) {
       if (err) {
          console.log(err);
        } else {
         console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', records.length);
        }
      //Close connection
      db.close();
    }); 
     console.log("done");
 })
    // Insert some users
   /* collection.insert(data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
*/
  }
});