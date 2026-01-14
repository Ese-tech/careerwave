// backend/src/config/firebase.ts
import admin from "firebase-admin";
import "dotenv/config";

if (!admin.apps.length) {
  // Production: Use environment variables directly
  if (process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    console.log("Firebase Admin initialized with environment variables ✅");
  } 
  // Development: Use service account file
  else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
    });
    console.log("Firebase Admin initialized with service account file ✅");
  } 
  else {
    throw new Error("Firebase credentials not configured. Set either FIREBASE_PRIVATE_KEY or GOOGLE_APPLICATION_CREDENTIALS.");
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
