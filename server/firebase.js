import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db;
let auth;

try {
  if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
      : null;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'dayflow-hrms-demo'
      });
    }
  }

  db = admin.firestore();
  auth = admin.auth();
} catch (error) {
  console.warn('Firebase Admin SDK initialized in fallback mode:', error.message);
}

export { admin, db, auth };
