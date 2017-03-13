#meloseession version 1.0.0

###Features
* Read and write values by a key
* Write any type of document such as json documents.
* Auto sync old and new database.
 
 ###Use in Node.js
 ```
npm install melosession --save
```
You can set or get values by a wrapper without depend on any technologies. we can use plugins for using any supported database.



####config styles
* `mongo` config style
```javascript
{
    type: 'mongo',
    url: 'mongo://localhost:27017/database',
    collection: 'mycollection'
}
```

* `redis` config style
```javascript
{
    type:'redis',
    host:'127.0.0.1',
    port:6379,
    database:0
}
```
##Examples
