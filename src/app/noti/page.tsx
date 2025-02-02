"use client"
// import { useEffect, useState } from "react";
// // import { } from "./firebase";
// import { messaging, getToken, onMessage } from "../../lib/firebaseConfig";

// const NotificationHandler: React.FC = () => {
//   const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
//   const [fcmToken, setFcmToken] = useState<string>("");

//   useEffect(() => {
//     requestPermission();
//     handleForegroundMessages();
//   }, []);

//   // 🔹 Request Notification Permi,,ssion and Get FCM Token
//   const requestPermission = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//         console.log("Notification permission granted.");
//         const token = await getToken(messaging, {
//           vapidKey: "YOUR_VAPID_KEY", // Replace with your Firebase VAPID Key
//         });
//         if (token) {
//           console.log("FCM Token:", token);
//           setFcmToken(token);
//           // TODO: Send this token to your backend server for sending push notifications
//         } else {
//           console.error("Failed to get FCM token.");
//         }
//       } else {
//         console.error("Notification permission denied.");
//       }
//     } catch (error) {
//       console.error("Error requesting notification permission:", error);
//     }
//   };

//   // 🔹 Handle Foreground Notifications
//   const handleForegroundMessages = () => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received: ", payload);
//       setNotification(payload.notification  );
//     });
//   };

//   return (
//     <div>
//       {notification && (
//         <div style={{ backgroundColor: "lightgray", padding: "10px", margin: "10px" }}>
//           <h4>New Notification</h4>
//           <p><strong>Title:</strong> {notification.title}</p>
//           <p><strong>Body:</strong> {notification.body}</p>
//         </div>
//       )}
//       {fcmToken && (
//         <div>
//           <h4>Your FCM Token:</h4>
//           <textarea readOnly value={fcmToken} style={{ width: "100%", height: "100px" }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationHandler;
// notifcation.tsx


// import React, { useEffect, useState } from 'react'; 
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
//  import { firebaseApp} from "../../lib/firebaseConfig";

// const VAPID_KEY = "BPRttqabA2LNhleGgOs-dgNeYS6GRNATr74cjFI7CgV048lh9ZlLMDDa0ZPRi666QQFf6GYOSioP8It-K5dCn_4";

// const NotificationPage = () => {
//   const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
//   const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
//   const [fcmToken, setFcmToken] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     // Check if browser supports notifications
//     if (!('Notification' in window)) {
//       setError('This browser does not support notifications');
//       return;
//     }

//     // Check notification permission
//     setPermissionStatus(Notification.permission);
//   }, []);

//   const initializeFirebaseMessaging = async () => {
//     try {
//       const messaging = getMessaging(firebaseApp);
      
//       // Request permission and get token
//       const permission = await Notification.requestPermission();
//       setPermissionStatus(permission);

//       if (permission === 'granted') {
//         // Get FCM token
//         const token = await getToken(messaging, { vapidKey: VAPID_KEY });
//         setFcmToken(token);

//         // Handle foreground messages
//         onMessage(messaging, (payload) => {
//           setNotification({
//             title: payload.notification?.title || 'New Message',
//             body: payload.notification?.body || 'You have a new notification'
//           });
//         });
//       }
//     } catch (err) {
//       setError('Error initializing notifications: ' );
//     }
//   };

//   const requestPermission = async () => {
//     try {
//       await initializeFirebaseMessaging();
//     } catch (err) {
//       setError('Error requesting permission: ');
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Push Notifications Demo</h1>

//       {error && ( 
//                   <h2 className="font-semibold mb-2">Notification error{error}</h2>

        
//       )}

//       <div className="space-y-4">
//         <div className="p-4 border rounded">
//           <h2 className="font-semibold mb-2">Notification Status</h2>
//           <p>Permission: {permissionStatus}</p>
//           {fcmToken && (
//             <div className="mt-2">
//               <p className="font-semibold">FCM Token:</p>
//               <p className="break-all text-sm mt-1">{fcmToken}</p>
//             </div>
//           )}
//         </div>

//         {permissionStatus !== 'granted' && (
//           <button
//             onClick={requestPermission}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Enable Push Notifications
//           </button>
//         )}

//         {notification && (
//           <div className="mt-4 p-4 bg-gray-100 rounded">
//             <h3 className="font-semibold">{notification.title}</h3>
//             <p className="mt-1">{notification.body}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;


import React, { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { firebaseApp } from "../../lib/firebaseConfig";

const VAPID_KEY = "BPRttqabA2LNhleGgOs-dgNeYS6GRNATr74cjFI7CgV048lh9ZlLMDDa0ZPRi666QQFf6GYOSioP8It-K5dCn_4";

interface NotificationData {
  title: string;
  body: string;
}

interface FirebaseNotificationPayload {
  notification?: {
    title?: string;
    body?: string;
  };
}

const NotificationPage: React.FC = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [fcmToken, setFcmToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [messaging, setMessaging] = useState<Messaging | null>(null);

  useEffect(() => {
    if (!('Notification' in window)) {
      setError('This browser does not support notifications');
      return;
    }
    setPermissionStatus(Notification.permission);
    
    // Initialize messaging once
    const msg = getMessaging(firebaseApp);
    setMessaging(msg);
  }, []);
useEffect(() => {
  const registerServiceWorker = async () => {
    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker registered successfully.");
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      setError("Failed to register service worker.");
    }
  };

  registerServiceWorker();
}, []);

  const initializeFirebaseMessaging = async (): Promise<void> => {
    try {
      if (!messaging) {
        throw new Error('Messaging not initialized');
      }

      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        setFcmToken(token);

        onMessage(messaging, (payload: FirebaseNotificationPayload) => {
          setNotification({
            title: payload.notification?.title || 'New Message',
            body: payload.notification?.body || 'You have a new notification'
          });
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError('Error initializing notifications: ' + errorMessage);
    }
  };

  const sendTestNotification = (): void => {
    setNotification({
      title: 'Test Notification',
      body: 'This is a test notification to verify the display!'
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Push Notifications Demo</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Notification Status</h2>
            <p className="mb-2">Permission: <span className="font-medium">{permissionStatus}</span></p>
            
            {fcmToken && (
              <div className="mt-4">
                <p className="font-medium">FCM Token:</p>
                <div className="bg-gray-100 p-2 rounded mt-1 break-all">
                  <code className="text-sm">{fcmToken}</code>
                </div>
              </div>
            )}
          </div>

          {permissionStatus !== 'granted' && (
            <button
              onClick={initializeFirebaseMessaging}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Enable Push Notifications
            </button>
          )}

          {permissionStatus === 'granted' && (
            <button
              onClick={sendTestNotification}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
            >
              Send Test Notification
            </button>
          )}

          {notification && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
              <h3 className="font-bold text-lg mb-2">{notification.title}</h3>
              <p>{notification.body}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;