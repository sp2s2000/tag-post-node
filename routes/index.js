const express = require('express');
const path = require('path');
const router = express.Router();
const WebSocket = require('ws');

let wss;

// Function to set WebSocket server
function setWss(webSocketServer) {
  wss = webSocketServer;
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve the live.html file for the /tag-view route
router.get('/tag-view', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/live.html'));
});

// Endpoint to receive tag data
router.post('/tag-data', (req, res) => {
  console.log(req.body);
  // Notify all connected clients about the new tag data
  if (wss) {
    wss.clients.forEach(client => {
      console.log('Sending data to client');
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(req.body));
      }
    });
  }
  res.status(200).json({
    message: 'Tag data received',
  });
});

function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = {
  router,
  setupWebSocket,
};
