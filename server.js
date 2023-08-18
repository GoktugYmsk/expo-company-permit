const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'web-build')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});