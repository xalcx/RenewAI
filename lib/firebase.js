// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebase configuration with fallback values for development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "fake-api-key-for-development",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "fake-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fake-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "fake-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

// Initialize Firebase with conditional check to prevent errors
let app
let auth

// Check if we're in a browser environment before initializing Firebase
if (typeof window !== "undefined") {
  try {
    // Checking if any Firebase app has already been initialized
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)

    // Add console message for debugging in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.log("Firebase initialized successfully")
    }
  } catch (error) {
    // Prevent crashing in production, but log error
    console.error("Firebase initialization error:", error)

    // Create placeholder objects to prevent null reference errors
    auth = {
      signInWithPopup: () => Promise.reject(new Error("Firebase auth not available")),
      signOut: () => Promise.resolve(),
      onAuthStateChanged: () => () => {},
    }
  }
} else {
  // Server-side placeholder for auth
  auth = {
    signInWithPopup: () => Promise.reject(new Error("Firebase auth not available on server")),
    signOut: () => Promise.resolve(),
    onAuthStateChanged: () => () => {},
  }
}

export { app, auth }
