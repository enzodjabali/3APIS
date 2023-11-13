const express = require('express');
const app = express();
const port = process.env.APP_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`First exercise app listening on port ${port}`)
});