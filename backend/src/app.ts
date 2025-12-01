// backend/src/app.ts
import "dotenv/config";
import routes from "@/routes"; // your routes/index.ts
import "@/config/firebase"; // ensure Firebase Admin is initialized

// Optional: debug ENV
console.log("ENV CHECK:", {
  // PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  // CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  //STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  //PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "DEFINED" : "UNDEFINED",
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET ? "DEFINED" : "UNDEFINED",
});

const app = routes; // routes is an Elysia instance

app.listen(Number(process.env.PORT) || 8080, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 8080}`)
);

