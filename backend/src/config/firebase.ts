// backend/src/config/firebase.ts
import admin from "firebase-admin";
import "dotenv/config";

if (!admin.apps.length) {
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!serviceAccountPath) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath), // jetzt string garantiert
    storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
  });

  console.log("Firebase Admin initialized ✅");
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
