const express = require('express');
const app = express();

//befehl für connect to view
index.set('view engine' , 'ejs'),

/* 
app.post();
app.put();
app.delete(); */

//entweder das
/*
app.get('/',(req,res )=>{
    res.send('hello express');
});
*/

//oder das
app.get('/api/users',(req,res )=>{
    res.send([
        {id: 1 , name: 'user1'},
        {id: 2 , name: 'user2'},
    ]);
});

//web server herstellen
app.listen(3000,()=> console.log('listening on port 3000'));