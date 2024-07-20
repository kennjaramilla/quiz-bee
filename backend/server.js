const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

// Use bodyParser middleware
app.use(bodyParser.json());

// Use the question routes
app.use('/api', questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
