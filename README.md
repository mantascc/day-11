# Apophenia - Interactive Message Storage

An interactive web application with animated background that allows users to send messages which are saved to a JSON file with timestamps.

## Features

- ✨ Beautiful animated particle background
- 💬 Input field with submit button
- 📝 Messages saved to `messages.json` with timestamps
- 🔄 Automatic fallback to localStorage if server unavailable
- 📱 Mobile responsive design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open in Browser
Navigate to `http://localhost:8000`

## Usage

1. Type a message in the input field at the bottom
2. Press Enter or click the submit button (↑) 
3. Your message will be saved to `messages.json` with:
   - Message text
   - ISO timestamp
   - Unique ID

## Message Format

Messages are stored in the following format:
```json
{
  "messages": [
    {
      "text": "Your message here",
      "timestamp": "2025-09-19T12:34:56.789Z",
      "id": 1726747696789
    }
  ]
}
```

## Files

- `index.html` - Main HTML page
- `styles.css` - Styling and animations
- `input.js` - Input handling and message saving
- `background.js` - Particle animation background
- `content.js` - Content rendering
- `server.js` - Express server for file operations
- `messages.json` - Storage for user messages
- `phrases.json` - Phrases for content display

## API Endpoints

- `POST /api/messages` - Save a new message
- `GET /api/messages` - Retrieve all messages

## Fallback Behavior

If the server is not running, messages will be saved to browser localStorage as a fallback, ensuring no data is lost.
