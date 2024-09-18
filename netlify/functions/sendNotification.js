const admin = require("firebase-admin");

const serviceAccount = {
        // Vos informations Firebase ici
};

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async function (event, context) {
        if (event.httpMethod === "POST") {
                try {
                        const { message } = JSON.parse(event.body);

                        const tokensSnapshot = await db.collection("user_tokens").get();
                        const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

                        if (tokens.length === 0) {
                                return {
                                        statusCode: 404,
                                        body: JSON.stringify({ message: "Aucun token trouvé." }),
                                };
                        }

                        const payload = {
                                notification: {
                                        title: "Notification Title",
                                        body: message,
                                },
                        };

                        const response = await admin.messaging().sendToDevice(tokens, payload);
                        return {
                                statusCode: 200,
                                body: JSON.stringify({ message: "Notifications envoyées avec succès", response }),
                        };
                } catch (error) {
                        console.error("Erreur lors de l'envoi des notifications:", error);
                        return {
                                statusCode: 500,
                                body: JSON.stringify({ error: "Erreur lors de l'envoi des notifications" }),
                        };
                }
        } else {
                return {
                        statusCode: 405,
                        body: JSON.stringify({ error: "Méthode HTTP non autorisée" }),
                };
        }
};
