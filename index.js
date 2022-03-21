const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/' + 'hives.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    })
});

app.get('/:hiveId', (req, res) => {
    fs.readFile(__dirname + '/' + 'hives.json', 'utf8', (err, data) => {
        const convertedData = JSON.parse(data);
        const hiveId = req.params.hiveId;
        const hiveKey = Object.keys(convertedData).find((key) => key === hiveId);
        res.setHeader('Content-Type', 'application/json');
        if (!hiveKey) {
            res.status(400).send('There is no such hive!');
        } else {
            const hive = convertedData[hiveKey];
            res.status(200).send(JSON.stringify(hive));
        }
    })
});

const server = app.listen(process.env.PORT || 8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(host, port)
});
