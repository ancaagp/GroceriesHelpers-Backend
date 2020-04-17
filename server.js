// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// PORT
const PORT = process.env.PORT || 4000;

// ROUTES
const routes = require('./routes');

// DATABASE
const db = require('./models');

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
}

// MIDDLEWARE
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1', routes.api);
app.use('/api/v1', routes.auth);

// SERVER START
app.get("/", (request, response) => {
    response.send('Hello World');
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));