// backend/src/config/firebase.ts
import admin from "firebase-admin";
import { join } from "path";

if (!admin.apps.length) {
  const serviceAccount = require(join(__dirname, "serviceAccountKey.json"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com",
  });
   // ✅ Confirm initialization
  console.log("Firebase Admin initialized ✅");
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();


