const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
