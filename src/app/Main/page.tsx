// Import the necessary libraries
"use client";
import React, { useState } from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';

  // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
  authDomain: "cupid-connect-d7fce.firebaseapp.com",
  projectId: "cupid-connect-d7fce",
  storageBucket: "cupid-connect-d7fce.appspot.com",
  messagingSenderId: "959322105870",
  appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
  measurementId: "G-Q0GFTYFTHN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
const auth = getAuth(firebaseApp);
// Define the Main component
function Main() {

const [user, setUser] = useState<User | null>(null);
const router = useRouter();

const signIn = async () => {
  try {
    // Check if user is already signed in
    const currentUser = auth.currentUser;
    if (currentUser) {
      // If user is already signed in, redirect to profile page
      console.log("User is already signed in.");
      router.push('/profile');
      return; // Exit the function
    }

    // If user is not signed in, proceed with signing in
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    if (typeof window !== 'undefined') {
      console.log("Redirecting to /profile");
      router.push('/profile');
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
};



  return (
    // Main section with a full height background
    <section className="text-white h-screen relative">


         <div>
     {/* <h1>Profile Page</h1> */}
       {user && (
         <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2"> Welcome,{user.displayName}</label>
            <label htmlFor="name" className="block text-gray-700  font-w400 mb-2"> Please create your profile genuinely</label>
           {/* <p>{user.displayName}</p> */}
           {/* {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />} */}
           {/* <button onClick={handleSignOut}>Sign out</button> */}
         </div>
       )}
</div> 

      {/* Image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="logo-container" onClick={signIn}>
            {/* <div className="logo-container"> */}

        {/* <Link href="/">  */}
 
            <Image
              src="/Logo1.png"
              width={250}
              height={100}
              alt="Logo"
              className="logo"
            />
        
               </div>

      </div>

      {/* Iframe */}
      <iframe
        src="https://saisreesatyassss.github.io/Proposal_Valentine_Special/"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="z-0"
      />

      {/* CSS */}
      <style jsx>{` 
      

    @media (max-width: 768px) {
        .logo {
 
           width: 150px !important;
            height: auto !important;
        }
    }


        /* Logo blinking animation */
        @keyframes blink {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        .logo-container {
          animation: blink 1s infinite alternate;
        }

        .logo {
          display: block;
        }
      `}</style>
    </section>
  );
}

// Export the Main component
export default Main;
