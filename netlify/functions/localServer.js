const express = require("express");
const sendNotification = require("./netlify/functions/sendNotification");

const app = express();
const port = 3000;

app.get("/sendNotification", async (req, res) => {
        const result = await sendNotification.handler();
        res.send(result.body);
});

app.listen(port, () => {
        console.log(`Serveur local lancé sur http://localhost:${port}`);
});
