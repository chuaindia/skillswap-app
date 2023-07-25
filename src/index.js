const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample data (replace this with your database)
let skillListings = [
  { id: 1, user: 'user1', skillOffered: 'Programming', skillWanted: 'Guitar' },
  { id: 2, user: 'user2', skillOffered: 'Photography', skillWanted: 'Cooking' },
];

app.get('/api/skillListings', (req, res) => {
  res.json(skillListings);
});

app.post('/api/skillListings', (req, res) => {
  const newListing = req.body;
  skillListings.push(newListing);
  res.status(201).json(newListing);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
