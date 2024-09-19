import express from "express";
import { handler as sendNotification } from "./sendNotification.js";

const app = express();
const port = 3000;

app.get("/sendNotification", async (req, res) => {
        const result = await sendNotification({ httpMethod: "POST", body: JSON.stringify({ message: "Votre message de test" }) });
        res.send(result.body);
});

app.listen(port, () => {
        console.log(`Serveur local lancé sur http://localhost:${port}`);
});
