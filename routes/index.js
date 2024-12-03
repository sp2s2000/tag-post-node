const express = require('express');
const path = require('path');
const router = express.Router();
const WebSocket = require('ws');
const BatchTagData = require('../db/schema/tag_data');

let wss;

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

router.post('/tag-data-save', async (req, res) => {
  try {
    console.log(req.body);
    // Notify all connected clients about the new tag data
    const newBatch = new BatchTagData({
      records: req.body,
    })
    await newBatch.save();
    res.status(200).json({
      message: 'Tag data saved',
    });
  } catch (error) {
    console.log('Error saving tag data', error);
  }
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
