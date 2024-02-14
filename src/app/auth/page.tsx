// // Import the functions you need from the Firebase SDK
// "use client";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from "firebase/auth";
// import { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { useRouter } from 'next/navigation'
// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
//   authDomain: "cupid-connect-d7fce.firebaseapp.com",
//   projectId: "cupid-connect-d7fce",
//   storageBucket: "cupid-connect-d7fce.appspot.com",
//   messagingSenderId: "959322105870",
//   appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
//   measurementId: "G-Q0GFTYFTHN"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Get the Firebase Auth instance
// const auth = getAuth(firebaseApp);

// const Auth = () => {
//   const [user, setUser] = useState<User | null>(null);
// const router = useRouter();
// const signIn = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     setUser(result.user);
//     if (typeof window !== 'undefined') {
//       console.log("Redirecting to /profile");
//       router.push('/profile');
//     }
//   } catch (error) {
//     console.error("Error signing in:", error);
//   }
// };


//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   useEffect(() => {
//     // Check if there is a currently signed-in user
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     // Cleanup function
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.displayName}</p>
//           <button onClick={signOutUser}>Sign out</button>
//         </div>
//       ) : (
//         <button onClick={signIn}>Sign in with Google</button>
//       )}
//     </div>
//   );
// };

// export default Auth;

 