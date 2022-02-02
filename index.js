const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const app = express();
app.use(express.json());
const portNumber = 4000;

app.listen(portNumber, () => {
  console.log(`listening on ${portNumber}`)
})

app.get('/cache', (req, res) => {
  let reqbody = req.body;
  let username = reqbody.username;
  let itemCode = reqbody.itemCode;
// Connection URL
const url = 'mongodb+srv://sanchez:1234Test@dskatadb.sjn12.mongodb.net/?authSource=admin';

  
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  const db = client.db('Cache');
  db.collection('CacheCollection').find({
    username: username,
    itemCode: itemCode
  }).toArray().then(result => {
    console.log(result)
    res.json(result)
    client.close();
  })
})
})



app.post('/cache', (req, res) => {
  let reqbody = req.body;
  let username = reqbody.username;
  let item = reqbody.item;
  let itemCode = reqbody.itemCode;
  let price = reqbody.price;
  let date = new Date();

  // Connection URL
  const url = 'mongodb+srv://sanchez:1234Test@dskatadb.sjn12.mongodb.net/?authSource=admin';

  
    // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, client) {
      const db = client.db('Cache');
      db.collection('CacheCollection').insertOne({
              username: username,
              item: item,
              itemCode: itemCode,
              price: price,
              date: date
            }).then((result)=> {
              console.log(result)
              res.json(result)
              client.close();
            })
      
         
    // .then(db => {
    //   db.collection('CacheCollection').then(collection => {
    //     collection.insertOne({
    //       username: username,
    //       item: item,
    //       itemCode: itemCode,
    //       price: price,
    //       date: date
    //     })
    //     client.close();
    //   })
    // });
    // const cache = db.collection('CacheCollection');
    // cache.insertOne()
  assert.equal(null, err);
 
  });
})

// db.collection('inventory').insertOne({
//   item: "canvas",
//   qty: 100,
//   tags: ["cotton"],
//   size: { h: 28, w: 35.5, uom: "cm" }
// })
// .then(function(result) {
//   // process result
// })


