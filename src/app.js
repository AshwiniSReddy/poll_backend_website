const express = require('express');
const bodyParser = require('body-parser');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use('/api/votes', voteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
