// backend/src/controllers/user.controller.ts
import { auth, db } from "@/config/firebase";

export const createUserController = async ({ body }: any) => {
  const { email, password } = body;

  try {
    // Create user using Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Add user document to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      role: "candidate",
      createdAt: new Date(),
    });

    return { message: "User created", uid: userRecord.uid };
  } catch (err: any) {
    console.error("Firebase Admin Error:", err);
    return { error: err.message };
  }
};
