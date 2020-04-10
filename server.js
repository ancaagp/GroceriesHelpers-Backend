// REQUIREMENTS
const express = require('express');
const app = express();


// MIDDLEWARE
app.use(express.static('public'));

// SERVER START
app.listen(4000, () => {
    console.log("server running at localhost:400");
});

app.get("/", (request, response) => {
    response.send('Hello World');
  });

