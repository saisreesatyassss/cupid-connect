// ProfilePage.js
"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'; 
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Image from 'next/image';
import Link from 'next/link';
import "./styles.css";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
const ProfilePage = () => {

  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
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

  useEffect(() => {
    // Check if there is a currently signed-in user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // If no user is signed in, redirect to the sign-in page
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to the sign-in page after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
 


 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission behavior
  
  // Get the currently authenticated user
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    // Handle case where there's no authenticated user
    console.error('No authenticated user found.');
    return;
  }

  try {
    // Get Firestore instance from the Firebase app
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, 'users');
    
    // Check if the user's profile already exists
    const userDoc = doc(usersCollection, currentUser.uid);
    const userDocSnapshot = await getDoc(userDoc);
    
    if (userDocSnapshot.exists()) {
      // Update the existing profile with the new data
        await updateDoc(userDoc, { name, age, gender, interests });
      alert('Profile updated successfully!');
    } else {
      // Add a new document with the user input data to a "users" collection
              await setDoc(userDoc, { name, age, gender, interests });

      alert('Profile created successfully!');
    }

    setName('');
    setAge(0);
    setGender(''); // Assuming you have a state variable for gender
    setInterests(''); // Assuming you have a state variable for interests
  } catch (error) {
    console.error('Error updating/creating profile:', error);
    alert('Error updating/creating profile. Please try again.');
  }
};



  return (
   
    <section className="  h-screen relative">
 
     
<form className="absolute top-24 left-16 z-10 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
    <input 
      type="text" 
      id="name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
      required 
    />
  </div>
  <div className="mb-4">
    <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age:</label>
    <input 
      type="number" 
      id="age" 
      value={age} 
      onChange={(e) => setAge(parseInt(e.target.value))} 
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
      min="18" // Assuming 18 as the minimum age requirement
      required 
    />
  </div>
  <div className="mb-4">
    <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>
    <select 
      id="gender" 
      value={gender} 
      onChange={(e) => setGender(e.target.value)} 
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
      required 
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div className="mb-4">
    <label htmlFor="interests" className="block text-gray-700 font-bold mb-2">Interests:</label>
    <textarea 
      id="interests" 
      value={interests} 
      onChange={(e) => setInterests(e.target.value)} 
      className="border rounded-md px-4 py-2 w-full h-24 resize-none focus:outline-none focus:border-blue-500"
      placeholder="Write about your interests..."
      required 
    ></textarea>
  </div>
  {/* Submit button */}
  <button 
    type="submit" 
    className="bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-pink-700"
  >
    Create Profile
  </button>
</form>



      {/* Iframe */}
      <iframe
        src="https://saisreesatyassss.github.io/LoveTree/"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="z-0"
      />
{/* <div>
     <h1>Profile Page</h1>
       {user && (
         <div>
           <p>Welcome, {user.displayName}</p>
           {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />}
           <button onClick={handleSignOut}>Sign out</button>
         </div>
       )}
     </div> */}
      {/* CSS */}
      <style jsx>
        {`
    
       @media (max-width: 768px) {
       iframe {
    display: block;  
 
  }
    } 
 .logo {
          display: block;
        }
      `}
      </style>
    </section>
  );
};

export default ProfilePage;
