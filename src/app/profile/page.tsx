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


  const [selectedOption, setSelectedOption] = useState<string>('');  
  const [selectedRelationshipOption, setSelectedRelationshipOption] = useState<string>('');  
  const [selectedCommunicationOption, setSelectedCommunicationOption] = useState<string>('');  
  const [selectedStanceOnChildren, setSelectedStanceOnChildren] = useState<string>('');  
  const [selectedLifestyle , setSelectedLifestyle] = useState<string>('');  
  const [selectedIdealFirstDate , setSelectedIdealFirstDate] = useState<string>('');  
  const [selectedAttitudeTowardsPets , setSelectedAttitudeTowardsPets] = useState<string>('');  
  const [selectedReligionSpirituality  , setSelectedReligionSpirituality] = useState<string>('');  
  const [selectedConflictResolution  , setSelectedConflictResolution] = useState<string>('');  
  const [selectedFinancesApproach   , setSelectedFinancesApproach] = useState<string>(''); 
  const [selectedPhysicalIntimacy    , setSelectedPhysicalIntimacy ] = useState<string>('');  
 
// const mcqOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Example MCQ options

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
        await updateDoc(userDoc, { name, age, gender, interests,selectedCommunicationOption,selectedRelationshipOption,selectedStanceOnChildren,selectedLifestyle ,selectedIdealFirstDate ,selectedAttitudeTowardsPets ,selectedReligionSpirituality ,selectedConflictResolution ,selectedFinancesApproach ,selectedPhysicalIntimacy  });
      alert('Profile updated successfully!');
    } else {
      // Add a new document with the user input data to a "users" collection
        await setDoc(userDoc, { name, age, gender, interests,selectedCommunicationOption,selectedRelationshipOption,selectedStanceOnChildren,selectedLifestyle ,selectedIdealFirstDate ,selectedAttitudeTowardsPets ,selectedReligionSpirituality ,selectedConflictResolution ,selectedFinancesApproach ,selectedPhysicalIntimacy  });

      alert('Profile created successfully!');
    }

    setName('');
    setSelectedCommunicationOption('');
    setSelectedCommunicationOption('');
    setAge(18);
    setGender('');
    setInterests(''); 
  } catch (error) {
    console.error('Error updating/creating profile:', error);
    alert('Error updating/creating profile. Please try again.');
  }
};

const relationshipOptions = [
  "Casual dating",
  "Serious relationship",
  "Just looking for friends",
  "Open to different options"
];

const communicationOptions = [
  "Daily",
  "A few times a week",
  "Occasionally",
  "Depends on the day"
];
const stanceOnChildrenOptions = [
  "Want children someday",
  "Don't want children",
  "Still undecided",
  "Prefer not to disclose"
];

 

const lifestyleOptions = [
  "Active and adventurous",
  "Chill and laid-back",
  "Social and outgoing",
  "Balanced b/w activities and relaxation"
];

const idealFirstDateOptions = [
  "Fancy dinner out",
  "Outdoor adventure (hiking, etc.)",
  "Netflix and snacks at home",
  "Coffee or drinks at a cozy spot"
];

const attitudeTowardsPetsOptions = [
  "Love them! Have pets or want them",
  "Like them but don't have any",
  "Not a fan",
  "Allergic to pets"
];

const religionSpiritualityOptions = [
  "Very important to me",
  "Somewhat important",
  "Not important",
  "Prefer not to say"
];

const conflictResolutionOptions = [
  "Open communication",
  "Taking time to cool off",
  "Seeking advice",
  "Avoiding conflicts"
];

const financesApproachOptions = [
  "Keeping finances separate",
  "Sharing joint finances",
  "Combination of both",
  "Prefer not to share financial details"
];
 
 
const physicalIntimacyOptions = [
  "Extremely important",
  "Important, but not crucial",
  "Not very important",
  "Depends on the relationship"
];
  return (
   
    <section className="  h-screen relative">
 
     
<form className="fixed h-[calc(100vh-6rem)] w-[90vw] md:w-[28vw]  overflow-auto top-24 left-[calc(50%-45vw)] z-10 bg-white p-8 rounded-lg shadow-lg " onSubmit={handleSubmit}>
 
  <div className="mb-4">
    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
    <input 
      type="text" 
      id="name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-pink-400"
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
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-pink-400"
      min="18" 
      required 
    />
  </div>
  <div className="mb-4">
    <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>
    <select 
      id="gender" 
      value={gender} 
      onChange={(e) => setGender(e.target.value)} 
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-pink-400"
      required 
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      {/* <option value="other">Other</option> */}
    </select>
  </div>
  
  {/* <div className="mb-4">
  <label htmlFor="mcq" className="block text-gray-700 font-bold mb-2">Multiple Choice Question:</label>
  <select 
    id="mcq" 
    value={selectedOption} 
    onChange={(e) => setSelectedOption(e.target.value)} 
    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-pink-400"
    required 
  >
    <option value="">Select Option</option>
    {mcqOptions.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
</div> */}
<div>
  {/* Relationship Preference */}
  <div className="mb-4">
    <label htmlFor="relationshipPreference" className="block text-gray-700 font-bold mb-2">Relationship Preference:</label>
    {relationshipOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`relationshipOption${index}`} 
          value={option} 
          checked={selectedRelationshipOption === option} 
          onChange={() => setSelectedRelationshipOption(option)} 
          className="mr-2"
        />
        <label htmlFor={`relationshipOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Communication Frequency */}
  <div className="mb-4">
    <label htmlFor="communicationFrequency" className="block text-gray-700 font-bold mb-2">Communication Frequency:</label>
    {communicationOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`communicationOption${index}`} 
          value={option} 
          checked={selectedCommunicationOption === option} 
          onChange={() => setSelectedCommunicationOption(option)} 
          className="mr-2"
        />
        <label htmlFor={`communicationOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>
</div>
 
  {/* Stance on Children */}
  <div className="mb-4">
    <label htmlFor="stanceOnChildren" className="block text-gray-700 font-bold mb-2">Stance on Children:</label>
    {stanceOnChildrenOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`stanceOnChildrenOption${index}`} 
          value={option} 
          checked={selectedStanceOnChildren === option} 
          onChange={() => setSelectedStanceOnChildren(option)} 
          className="mr-2"
        />
        <label htmlFor={`stanceOnChildrenOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Lifestyle */}
  <div className="mb-4">
    <label htmlFor="lifestyle" className="block text-gray-700 font-bold mb-2">Lifestyle:</label>
    {lifestyleOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`lifestyleOption${index}`} 
          value={option} 
          checked={selectedLifestyle === option} 
          onChange={() => setSelectedLifestyle(option)} 
          className="mr-2"
        />
        <label htmlFor={`lifestyleOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Ideal First Date */}
  <div className="mb-4">
    <label htmlFor="idealFirstDate" className="block text-gray-700 font-bold mb-2">Ideal First Date:</label>
    {idealFirstDateOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`idealFirstDateOption${index}`} 
          value={option} 
          checked={selectedIdealFirstDate === option} 
          onChange={() => setSelectedIdealFirstDate(option)} 
          className="mr-2"
        />
        <label htmlFor={`idealFirstDateOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Attitude Towards Pets */}
  <div className="mb-4">
    <label htmlFor="attitudeTowardsPets" className="block text-gray-700 font-bold mb-2">Attitude Towards Pets:</label>
    {attitudeTowardsPetsOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`attitudeTowardsPetsOption${index}`} 
          value={option} 
          checked={selectedAttitudeTowardsPets === option} 
          onChange={() => setSelectedAttitudeTowardsPets(option)} 
          className="mr-2"
        />
        <label htmlFor={`attitudeTowardsPetsOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Importance of Religion/Spirituality */}
  <div className="mb-4">
    <label htmlFor="religionSpirituality" className="block text-gray-700 font-bold mb-2">Importance of Religion/Spirituality:</label>
    {religionSpiritualityOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`religionSpiritualityOption${index}`} 
          value={option} 
          checked={selectedReligionSpirituality === option} 
          onChange={() => setSelectedReligionSpirituality(option)} 
          className="mr-2"
        />
        <label htmlFor={`religionSpiritualityOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Conflict Resolution */}
  <div className="mb-4">
    <label htmlFor="conflictResolution" className="block text-gray-700 font-bold mb-2">Conflict Resolution:</label>
    {conflictResolutionOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`conflictResolutionOption${index}`} 
          value={option} 
          checked={selectedConflictResolution === option} 
          onChange={() => setSelectedConflictResolution(option)} 
          className="mr-2"
        />
        <label htmlFor={`conflictResolutionOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>

  {/* Approach to Finances */}
  <div className="mb-4">
    <label htmlFor="financesApproach" className="block text-gray-700 font-bold mb-2">Approach to Finances:</label>
    {financesApproachOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`financesApproachOption${index}`} 
          value={option} 
          checked={selectedFinancesApproach === option} 
          onChange={() => setSelectedFinancesApproach(option)} 
          className="mr-2"
        />
        <label htmlFor={`financesApproachOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
  </div>
 <div className="mb-4">
    <label htmlFor="physicalIntimacy" className="block text-gray-700 font-bold mb-2">Importance of Physical Intimacy:</label>
    {physicalIntimacyOptions.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input 
          type="radio" 
          id={`physicalIntimacyOption${index}`} 
          value={option} 
          checked={selectedPhysicalIntimacy === option} 
          onChange={() => setSelectedPhysicalIntimacy(option)} 
          className="mr-2"
        />
        <label htmlFor={`physicalIntimacyOption${index}`} className="text-gray-800">{option}</label>
      </div>
    ))}
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
