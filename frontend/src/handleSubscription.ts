export const handleSubscription = (user: any) => {
  'use strict';
  const axios = require('axios');
  let isSubscribed = false;
  let swRegistration = null;
  let anyReminder = false;

  //user object holds the user's reminder opt-in status as boolean.
  //checking if the user opted-in any of our reminder option
  if (Object.values(user).some((val) => val === true)) anyReminder = true;

  if (!('Notification' in window)) {
    console.log('Notifications not supported in this browser');
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
};
