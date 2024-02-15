//  "use client"

// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getFirestore,  QuerySnapshot, where, query, getDocs } from 'firebase/firestore';
// import { collection, doc, getDoc, Firestore, DocumentReference } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
//   authDomain: "cupid-connect-d7fce.firebaseapp.com",
//   projectId: "cupid-connect-d7fce",
//   storageBucket: "cupid-connect-d7fce.appspot.com",
//   messagingSenderId: "959322105870",
//   appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
//   measurementId: "G-Q0GFTYFTHN"
// };


// const firebaseApp = initializeApp(firebaseConfig);

// function Match() {
//   const [matchedUsers, setMatchedUsers] = useState([]);
//   const [currentUserGender, setCurrentUserGender] = useState(null); // Initialize with null

//   const [user, setUser] = useState<User | null>(null);


//     const auth = getAuth();
//     const db = getFirestore(firebaseApp);

 


//   useEffect(() => {
//     // const auth = getAuth();
//     // Get the current user's gender
// const getCurrentUserGender = async () => {
//   const currentUser = auth.currentUser;
//   console.log("Current user:", currentUser); // Log current user
  
//   if (currentUser) {
//     const userDocRef = collection(db, 'users').doc(currentUser.uid);
//     const userDocSnap = await userDocRef.get();
//     const userData = userDocSnap.data();
//     console.log("User data:", userData); // Log user data
//     setCurrentUserGender(userData.gender);
//   } else {
//     console.log("User not logged in"); // Log if user is not logged in
//   }
// };
//     getCurrentUserGender();
//   }, []);

//   useEffect(() => {
//     const fetchMatchedUsers = async () => {
//       const db = getFirestore(firebaseApp);
//       let usersCollectionRef = collection(db, 'users');
        
//       // Fetch users based on the current user's gender
//       if (currentUserGender === 'male') {
//         usersQuery = await getDocs(query(usersCollectionRef, where('gender', '==', 'female')));
//       } else if (currentUserGender === 'female') {
//         usersQuery = await getDocs(query(usersCollectionRef, where('gender', '==', 'male')));
//       } else {
//         // Handle case where gender is not determined or current user is not logged in
//         return;
//       }

//       const matchedUsersData = [];
//       usersQuery.forEach(doc => {
//         const userData = doc.data();
//         matchedUsersData.push(userData.name);
//       });
//       setMatchedUsers(matchedUsersData);
//     };

//     if (currentUserGender) {
//       fetchMatchedUsers();
//     }
//   }, [currentUserGender]);

//   return (
//     <section className="text-white h-screen relative">
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//         {/* Display matched user names */}
//          <h1>Matches</h1>
//         {matchedUsers.map((userName, index) => (
//           <div key={index}>{userName}</div>
//         ))}
//       </div>
//       <iframe
//         src="https://saisreesatyassss.github.io/loveBalloon/"
//         width="100%"
//         height="100%"
//         frameBorder="0"
//         allowFullScreen
//         className="z-0"
//       />
//     </section>
//   );
// }

// export default Match;


// Match.js
"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'; 
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app'; 
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
const Match = () => {

  // const [name, setName] = useState<string>('');

  // const [matchedUsers, setMatchedUsers] = useState([]);

const [matchedUsers, setMatchedUsers] = useState<string[]>([]);
  const [currentUserGender, setCurrentUserGender] = useState(null); 

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
const db = getFirestore(firebaseApp);

  useEffect(() => {
    // Check if there is a currently signed-in user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // If no user is signed in, redirect to the sign-in page
                setUser(null);

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

 
  useEffect(() => {
    const fetchUserGender = async () => {
      if (user) {
        const db = getFirestore(firebaseApp);
        const usersCollection = collection(db, 'users');
        const userDoc = doc(usersCollection, user.uid);
        
        try {
          const userDocSnapshot = await getDoc(userDoc);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setCurrentUserGender(userData.gender);
            console.log("gender" +userData.gender);
          } else {
            setCurrentUserGender(null); // Handle if user document doesn't exist
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserGender();

  }, [user]); 
 
  useEffect(() => {
    const fetchMatchedUsers = async () => {
      if (currentUserGender) {
        const db = getFirestore(firebaseApp);
        const usersCollectionRef = collection(db, 'users');
        let usersQuery;
        
        // Fetch users based on the current user's gender
        if (currentUserGender === 'male') {
          usersQuery = await getDocs(query(usersCollectionRef, where('gender', '==', 'female')));
        } else if (currentUserGender === 'female') {
          usersQuery = await getDocs(query(usersCollectionRef, where('gender', '==', 'male')));
        } else {
          // Handle case where gender is not determined
          return;
        }

        const matchedUsers: any[] | ((prevState:string[]) => string[]) = [];
        usersQuery.forEach(doc => {
          const userData = doc.data();
          matchedUsers.push(userData.name);
        });
        setMatchedUsers(matchedUsers);
        console.log("test match"+setMatchedUsers(matchedUsers));
      }
    };

    fetchMatchedUsers();

  }, [currentUserGender]);
 
  return (
   
    <section className="  h-screen relative">
  {/* <div>
     <h1>Profile Page</h1>
       {user && (
         <div>
           <p>Welcome, {user.displayName}</p>
           {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />}
           <button onClick={handleSignOut}>Sign out</button>
         </div>
       )}
</div>  */}
     
<form className="fixed h-[calc(100vh-6rem)] w-[90vw] md:w-[28vw]  overflow-auto top-24 right-[calc(50%-45vw)] z-10 bg-white p-8 rounded-lg shadow-lg ">
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

       <h1>Matches</h1>
       {matchedUsers.map((userName, index) => (
          <div key={index}>{userName}</div>
        ))}
</div> 
</form>



      {/* Iframe */}
      <iframe
        src="https://saisreesatyassss.github.io/loveBalloon/"
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

export default Match;
