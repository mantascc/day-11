const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Endpoint to save messages
app.post('/api/messages', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.text) {
      return res.status(400).json({ error: 'Message text is required' });
    }
    
    const messagesPath = path.join(__dirname, 'messages.json');
    
    // Read existing messages
    let data = { messages: [] };
    try {
      const fileContent = await fs.readFile(messagesPath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      console.log('Creating new messages file');
    }
    
    // Create new message without ID - just text and timestamp
    const newMessage = {
      text: message.text,
      timestamp: message.timestamp || new Date().toISOString()
    };
    
    // Add new message
    data.messages.push(newMessage);
    
    // Write back to file
    await fs.writeFile(messagesPath, JSON.stringify(data, null, 2));
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Endpoint to get messages
app.get('/api/messages', async (req, res) => {
  try {
    const messagesPath = path.join(__dirname, 'messages.json');
    const fileContent = await fs.readFile(messagesPath, 'utf8');
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    // Return empty messages if file doesn't exist
    res.json({ messages: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('You can now save messages to messages.json!');
});
