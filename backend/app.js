const express = require('express');
const cors = require('cors');
const path = require('path');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/quiz-bee')));
app.use('/api', questionRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/quiz-bee/index.html'));
});

module.exports = app;
