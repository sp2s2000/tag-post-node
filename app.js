const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const PORT = 3000;

// Allow the app to accept JSON data
app.use(bodyParser.json());

// Basic Auth middleware
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  challenge: true // This will prompt the browser to show the basic auth dialog
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the router for handling routes
app.use('/', indexRouter);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
