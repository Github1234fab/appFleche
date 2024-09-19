const admin = require("firebase-admin");

const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function sendNotification(message) {
        try {
                const tokensSnapshot = await db.collection("user_tokens").get();
                const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

                if (tokens.length === 0) {
                        return { message: "Aucun token trouvé." };
                }

                const payload = {
                        notification: {
                                title: "Notification Title",
                                body: message,
                        },
                };

                const response = await admin.messaging().sendToDevice(tokens, payload);
                return { message: "Notifications envoyées avec succès", response };
        } catch (error) {
                console.error("Erreur lors de l'envoi des notifications:", error);
                throw new Error("Erreur lors de l'envoi des notifications");
        }
}

module.exports = { sendNotification };
