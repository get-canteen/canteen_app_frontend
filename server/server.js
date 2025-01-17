const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`);
});
