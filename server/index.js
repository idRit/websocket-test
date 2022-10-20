const express = require("express");
const cors = require("cors");
const ws = require("ws");

const app = express();
app.use(cors());

const server = app.listen('4000');
console.log("Server started on port 4000");

const wss = new ws.Server({ server });

const wsList = [];

wss.on('connection', (ws) => {
    wsList.push(ws);
    console.log("Connected: ", wsList.length);
    ws.on('close', ws => {
        wsList.splice(wsList.indexOf(ws), 1);
        console.log("Connected: ", wsList.length);
    });
    ws.on('message', (message) => {
        message = message.toString();
        handlePing(ws, message)
    });
});

const handlePing = (ws, message) => {
    if (message !== '_ping') return;
    setTimeout(() => {
        ws.send('_pong');
    }, 9000);
};