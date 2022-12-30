const express = require('express');
const app = new Array(3);


for(let i = 3000; i < 3005; i++){
    app[i] = express();
    app[i].listen(i, ()=>console.log('Server running on ', i));
};