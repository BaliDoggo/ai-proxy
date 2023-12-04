const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            res.status(400).send('URL parameter is required.');
            return;
        }

        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            res.status(400).send('Only HTML content type is supported.');
            return;
        }

        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching page: ' + error);
    }
});

app.listen(3000, () => {
    console.log('Web proxy server is running on port 3000.');
});
