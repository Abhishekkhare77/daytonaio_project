
// console.log('Script running');
// const loginSubmit = document.getElementById("login_submit");

// if (localStorage.getItem("user_id") != null) {
//   window.location.href = "/popup.html";
// }

// // if (localStorage.getItem("user_id") === null && localStorage.getItem("org_id") === null) {
// //   window.location.href = "/login.html"; // Redirect to login.html if both user_id and org_id are null
// // } else if (localStorage.getItem("user_id") !== null && localStorage.getItem("org_id") === null) {
// //   window.location.href = "/createOrg.html"; // Redirect to createOrg.html if only user_id is present
// // } else if (localStorage.getItem("user_id") !== null && localStorage.getItem("org_id") !== null) {
// //   window.location.href = "/popup.html"; // Redirect to popup.html if both user_id and org_id are present
// // }


// if (loginSubmit) {
//   loginSubmit.addEventListener('click', (e) => {
//     e.preventDefault(); // Prevent default form submission

//     loginfun();
//   });
// } else {
//   console.error('Element with id "login_submit" not found');
// }

// function loginfun() {
//   const email = document.getElementById("login_Email").value;
//   const password = document.getElementById("login_Pass").value;

//   console.log('Email:', email);
//   // console.log('Password:', password);

//   // Send data to backend using fetch
//   fetch('https://team-org-backend.onrender.com/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // console.log('Success:', data);
//       // console.log('id :', data.id);

//       const user_id = data.id;
//       const org_id = data.org_id;
//       const user_role = data.user_role;

//       // console.log(user_id);
//       // console.log(org_id);
//       // console.log(user_role);

//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('org_id', org_id);
//       localStorage.setItem('user_role', user_role);

//       // Store user ID in chrome.storage.local
//       chrome.storage.local.set({ user_id: user_id }, function() {
//         console.log('User ID stored in chrome.storage.local:', user_id);
//       });

//       // Redirect to popup.html after successful login
//       window.location.href = "./popup.html";
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       showSuccessMessage();
//       // Handle errors here, show error message
//     });
// }


// function showSuccessMessage() {
//     const successMessage = document.getElementById('error_message');
//     successMessage.style.display = 'block'; // Show the success message

//     setTimeout(() => {
//         successMessage.style.display = 'none'; // Hide the success message after 3 seconds
//     }, 6000);
// }



console.log('Script running');
const loginSubmit = document.getElementById("login_submit");
const loginText = document.getElementById("login_text");
const spinnerContainer = document.getElementById("spinner_container");

if (localStorage.getItem("user_id") != null) {
  window.location.href = "/popup.html";
}

if (loginSubmit) {
  loginSubmit.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    spinnerContainer.style.display = 'inline-block'; // Show the spinner
    loginText.style.display = 'none'; // Hide the login text
    loginfun();
  });
} else {
  console.error('Element with id "login_submit" not found');
}

function loginfun() {
  const email = document.getElementById("login_Email").value;
  const password = document.getElementById("login_Pass").value;

  console.log('Email:', email);
  // console.log('Password:', password);

  // Send data to backend using fetch
  fetch('https://team-org-backend.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // console.log('Success:', data);
      // console.log('id :', data.id);

      const user_id = data.id;
      const org_id = data.org_id;
      const user_role = data.user_role;

      // console.log(user_id);
      // console.log(org_id);
      // console.log(user_role);

      localStorage.setItem('user_id', user_id);
      localStorage.setItem('org_id', org_id);
      localStorage.setItem('user_role', user_role);

      // Store user ID in chrome.storage.local
      chrome.storage.local.set({ user_id: user_id }, function() {
        console.log('User ID stored in chrome.storage.local:', user_id);
      });

      // Redirect to popup.html after successful login
      window.location.href = "./popup.html";
    })
    .catch(error => {
      console.error('Error:', error);
      showSuccessMessage();
      // Handle errors here, show error message
    })
    .finally(() => {
      spinnerContainer.style.display = 'none'; // Hide the spinner
      loginText.style.display = 'inline-block'; // Show the login text
    });
}

function showSuccessMessage() {
  const successMessage = document.getElementById('error_message');
  successMessage.style.display = 'block'; // Show the success message

  setTimeout(() => {
    successMessage.style.display = 'none'; // Hide the success message after 3 seconds
  }, 6000);
}
