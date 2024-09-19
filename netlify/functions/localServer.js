const express = require("express");
const { sendNotification } = require("./sendNotification.js"); // Importez la fonction sendNotification

const app = express();
const port = 3000;

app.get("/sendNotification", async (req, res) => {
        try {
                const message = "Hello, les cow-boys!"; // Personnalisez le message
                const result = await sendNotification(message);
                res.send(result);
        } catch (error) {
                res.status(500).send("Erreur lors de l'envoi des notifications");
        }
});

app.listen(port, () => {
        console.log(`Serveur local lancé sur http://localhost:${port}`);
});
