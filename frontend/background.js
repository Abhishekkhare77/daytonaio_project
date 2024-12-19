// chrome.runtime.onInstalled.addListener(() => {
//     // Set initial badge count to 0
//     chrome.action.setBadgeText({ text: '0' });
//     chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color
// });

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.user_id) {
//     console.log('Received user_id in background.js:', message.user_id);
//     // Store user_id or perform actions with it as needed
//   }
// });

// // Function to update badge count
// function updateBadgeCount(count) {
//     chrome.action.setBadgeText({ text: count.toString() });
// }


// async function fetchNotifications() {
//     console.log('Fetching notifications');
//     try {
//       const response = await fetch(`https://team-org-backend.onrender.com/notifications/667d003913491597174165b5`);
//       const notifications = await response.json();

//       chrome.storage.local.get('viewedNotifications', async function(result) {
//         let viewedNotifications = result.viewedNotifications || [];
//         let newViewedNotifications = [];

//         updateBadgeCount(notifications.length);

//         notifications.forEach(notification => {
//           if (!viewedNotifications.includes(notification._id)) {
//             chrome.notifications.create('', {
//               type: 'basic',
//               iconUrl: 'bell.jpeg',
//               title: notification.title,
//               message: notification.message,
//               priority: 1
//             });

//             // Add the notification to the new viewed list
//             newViewedNotifications.push(notification._id);
//           }
//         });

//         // Update the viewed notifications in chrome.storage
//         chrome.storage.local.set({ viewedNotifications: [...viewedNotifications, ...newViewedNotifications] }, function() {
//           console.log('Viewed notifications updated.');
//         });

//       });
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   }

//   // Poll every 60 seconds
//   setInterval(fetchNotifications, 60000);


// chrome.runtime.onInstalled.addListener(() => {
//   // Set initial badge count to 0
//   chrome.action.setBadgeText({ text: '0' });
//   chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.user_id) {
//     console.log('Received user_id in background.js:', message.user_id);
//     // Store user_id or perform actions with it as needed
//     // fetchNotifications(message.user_id); // Call fetchNotifications with user_id
//     chrome.storage.local.set({ user_id: message.user_id }, function () {
//       console.log('User ID stored in chrome.storage.local:', message.user_id);
//     });
//   }
// });

// // Function to update badge count
// function updateBadgeCount(count) {
//   chrome.action.setBadgeText({ text: count.toString() });
// }

// async function fetchNotifications(user_id) {
//   console.log('Fetching notifications for user:', user_id);
//   try {
//     const response = await fetch(`https://team-org-backend.onrender.com/notifications/${user_id}`);
//     const notifications = await response.json();

//     chrome.storage.local.get('viewedNotifications', async function (result) {
//       let viewedNotifications = result.viewedNotifications || [];
//       let newViewedNotifications = [];

//       updateBadgeCount(notifications.length);

//       notifications.forEach(notification => {
//         if (!viewedNotifications.includes(notification._id)) {
//           chrome.notifications.create('', {
//             type: 'basic',
//             iconUrl: 'bell.jpeg',
//             title: notification.title,
//             message: notification.message,
//             priority: 1
//           });

//           // Add the notification to the new viewed list
//           newViewedNotifications.push(notification._id);
//         }
//       });

//       // Update the viewed notifications in chrome.storage
//       chrome.storage.local.set({ viewedNotifications: [...viewedNotifications, ...newViewedNotifications] }, function () {
//         console.log('Viewed notifications updated.');
//       });

//     });
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//   }
// }

// // Poll every 60 seconds for notifications
// setInterval(() => {
//   chrome.storage.local.get('user_id', function (result) {
//     const user_id = result.user_id;
//     if (user_id) {
//       fetchNotifications(user_id);
//     } else {
//       console.warn('User_id not found in storage.');
//     }
//   });
// }, 600);


// chrome.runtime.onInstalled.addListener(() => {
//   // Set initial badge count to 0
//   chrome.action.setBadgeText({ text: '0' });
//   chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
//   chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color
// });

// // Function to update badge count
// function updateBadgeCount(count) {
//   chrome.action.setBadgeText({ text: count.toString() });
// }

// async function fetchNotifications(user_id) {
//   console.log('Fetching notifications for user:', user_id);
//   try {
//     const response = await fetch(`https://team-org-backend.onrender.com/notifications/${user_id}`);
//     const notifications = await response.json();

//     chrome.storage.local.get('viewedNotifications', async function(result) {
//       let viewedNotifications = result.viewedNotifications || [];
//       let newViewedNotifications = [];

//       updateBadgeCount(notifications.length);

//       notifications.forEach(notification => {
//         if (!viewedNotifications.includes(notification._id)) {
//           chrome.notifications.create('', {
//             type: 'basic',
//             iconUrl: 'bell.png',
//             title: notification.title,
//             message: notification.message,
//             priority: 1
//           });

//           // Add the notification to the new viewed list
//           newViewedNotifications.push(notification._id);
//         }
//       });

//       // Update the viewed notifications in chrome.storage
//       chrome.storage.local.set({ viewedNotifications: [...viewedNotifications, ...newViewedNotifications] }, function() {
//         console.log('Viewed notifications updated.');
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//   }
// }

// // Poll every 60 seconds for notifications
// setInterval(() => {
//   chrome.storage.local.get('user_id', function(result) {
//     const user_id = result.user_id;
//     if (user_id) {
//       fetchNotifications(user_id);
//     } else {
//       console.warn('User_id not found in storage.');
//     }
//   });
// }, 30000);





// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({ text: '0' });
//   chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
//   chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color
  
//   // Create an alarm to poll for notifications every 60 seconds
//   chrome.alarms.create('pollNotifications', { periodInMinutes: 1 });
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'pollNotifications') {
//     chrome.storage.local.get('user_id', function(result) {
//       const user_id = result.user_id;
//       if (user_id) {
//         fetchNotifications(user_id);
//       } else {
//         console.warn('User_id not found in storage.');
//       }
//     });
//   }
// });

// // Function to update badge count
// function updateBadgeCount(count) {
//   chrome.action.setBadgeText({ text: count.toString() });
// }

// async function fetchNotifications(user_id) {
//   console.log('Fetching notifications for user:', user_id);
//   try {
//     const response = await fetch(`https://team-org-backend.onrender.com/notifications/${user_id}`);
//     const notifications = await response.json();

//     chrome.storage.local.get('viewedNotifications', async function(result) {
//       let viewedNotifications = result.viewedNotifications || [];
//       let newViewedNotifications = [];

//       updateBadgeCount(notifications.length);

//       notifications.forEach(notification => {
//         if (!viewedNotifications.includes(notification._id)) {
//           chrome.notifications.create('', {
//             type: 'basic',
//             iconUrl: 'bell.png',
//             title: notification.title,
//             message: notification.message,
//             priority: 1
//           });

//           // Add the notification to the new viewed list
//           newViewedNotifications.push(notification._id);
//         }
//       });

//       // Update the viewed notifications in chrome.storage
//       chrome.storage.local.set({ viewedNotifications: [...viewedNotifications, ...newViewedNotifications] }, function() {
//         console.log('Viewed notifications updated.');
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//   }
// }

// // Use setInterval if needed, but ensure the interval is not too long
// setInterval(() => {
//   chrome.storage.local.get('user_id', function(result) {
//     const user_id = result.user_id;
//     if (user_id) {
//       fetchNotifications(user_id);
//     } else {
//       console.warn('User_id not found in storage.');
//     }
//   });
// }, 30000);

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: '0' });
  chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // Red color
  
  // Create an alarm to poll for notifications every 60 seconds
  chrome.alarms.create('pollNotifications', { periodInMinutes: 1 });
});

// Function to fetch profile data and update badge count
async function fetchProfileDataAndUpdateBadge(user_id) {
  try {
    const response = await fetch(`https://team-org-backend.onrender.com/my-profile/${user_id}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const item = await response.json();
    const pendingTaskCount = item.data.tasks_pending.length;
    console.log('pendingtasklength',pendingTaskCount)
    // Update the badge count with the pending task count
    updateBadgeCount(pendingTaskCount);
    
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
}

// Function to update badge count
function updateBadgeCount(count) {
  chrome.action.setBadgeText({ text: count.toString() });
}

// Fetch notifications and profile data periodically
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pollNotifications') {
    chrome.storage.local.get('user_id', function(result) {
      const user_id = result.user_id;
      if (user_id) {
        fetchNotifications(user_id);
        fetchProfileDataAndUpdateBadge(user_id);
      } else {
        console.warn('User_id not found in storage.');
      }
    });
  }
});

// Fetch notifications from the server
async function fetchNotifications(user_id) {
  try {
    const response = await fetch(`https://team-org-backend.onrender.com/notifications/${user_id}`);
    const notifications = await response.json();

    chrome.storage.local.get('viewedNotifications', async function(result) {
      let viewedNotifications = result.viewedNotifications || [];
      let newViewedNotifications = [];

      // updateBadgeCount(notifications.length);

      notifications.forEach(notification => {
        if (!viewedNotifications.includes(notification._id)) {
          chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'bell.png',
            title: notification.title,
            message: notification.message,
            priority: 1
          });

          newViewedNotifications.push(notification._id);
        }
      });

      chrome.storage.local.set({ viewedNotifications: [...viewedNotifications, ...newViewedNotifications] }, function() {
        console.log('Viewed notifications updated.');
      });
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}

// Periodically check for user_id and fetch data
setInterval(() => {
  chrome.storage.local.get('user_id', function(result) {
    const user_id = result.user_id;
    if (user_id) {
      fetchNotifications(user_id);
      fetchProfileDataAndUpdateBadge(user_id);
    } else {
      console.warn('User_id not found in storage.');
    }
  });
}, 30000);