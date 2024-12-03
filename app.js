const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router, setupWebSocket } = require('./routes/index');
const basicAuth = require('express-basic-auth');
const http = require('http');
const dotenv = require('dotenv');
const connectMongo = require('./db/index');
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

// Basic Auth middleware using environment variables
app.use(basicAuth({
  users: { [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD },
  challenge: true // This will prompt the browser to show the basic auth dialog
}));

// Allow the app to accept JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the router for handling routes
app.use('/', router);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

const server = http.createServer(app);
setupWebSocket(server);

const start = async () => {
  try {
    await connectMongo();
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

start();