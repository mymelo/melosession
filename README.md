#meloseession version 1.0.0

###Features
* Read and write values by a key
* Plugin support to compatible with any type of databases
* Write any type of document such as json documents
* Auto sync old and new database
 
###Use in Node.js
 ```
npm install melosession --save
```

####config styles
* `mongo` config style
```javascript
{
    type: 'mongo',
    config: {
        url: 'mongodb://localhost:27017/database',
        collection: 'mycollection'
    }
}
```

* `redis` config style
```javascript
{
    type:'redis',
    config:{
        host:'127.0.0.1',
        port:6379,
        database:0   
    }
}
```
##Example
At first, we must change config and set master and old session manager source and then run it as a rest service.</br>
Next, we can call it as bellow:
```javascript
var restify = require('restify');
var session = restify.createJsonClient({
                 url: 'address-of-hosted-rest',
                 version: '*'
              });

var testKey = 1234;
var testValue = {name:'Ali', last_name: 'Alian'};

/*Write*/
session.post('/set',testValue,function(err,res) {
  cosole.log(res); /*{ok: true}*/
})

/*Read*/
session.get('/get/'+testKey,function(err,res) {
  console.log(res); /*{key:1234, value :{name:'Ali', last_name: 'Alian'}}*/  
})

```
##plugins
In this version, there are two plugins called mongo and redis, You can write your 
plugin for your database with three methods as init, get and set.


