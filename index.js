const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('wellcome to the HAWK e-scooter server');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});