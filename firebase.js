// import { initializeApp } from "firebase/app";
// import { getToken, getMessaging, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyByzXfCrQPTSwzocHR9WywfW-P1GVc-WSs",
//   authDomain: "albion-9bab2.firebaseapp.com",
//   projectId: "albion-9bab2",
//   storageBucket: "albion-9bab2.appspot.com",
//   messagingSenderId: "1080007356916",
//   appId: "1:1080007356916:web:8c5e292faf91ed4af189a1",
//   measurementId: "G-8WBYYQMW5T"
// };

//   const firebaseApp = initializeApp(firebaseConfig);
//   const messaging = getMessaging(firebaseApp);

// export const getOrRegisterServiceWorker = () => {
//   if ("serviceWorker" in navigator) {
//     return window.navigator.serviceWorker
//       .getRegistration("/")
//       .then((serviceWorker) => {
//         if (serviceWorker) return serviceWorker;
//         return window.navigator.serviceWorker.register(
//           "../public/firebase-messaging-sw.js",
//           {
//             scope: "/",
//           }
//         );
//       });
//   }
//   throw new Error("The browser doesn`t support service worker.");
// };

// export const getFirebaseToken = () =>
//   getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
//     getToken(messaging, {
//       vapidKey:
//         "BD3ohwBToIePL8R4Y5xiNGEbT5_K7945bfHOKp-qpFPw4EJd8Xsy1PS_PI_wQyFgsG2Nwr7ljICVw4ASClssO4E",
//       serviceWorkerRegistration,
//     })
//   );

// export const onForegroundMessage = () =>
//   new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
