const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(PORT, () => console.log(`App is ready on port ${PORT}`));
