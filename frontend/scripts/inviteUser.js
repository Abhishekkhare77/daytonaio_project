

// console.log('running invite');

// const user_id = localStorage.getItem('user_id');
// // console.log(user_id);

// const inviteSubmit = document.getElementById("invite_user");

// if (inviteSubmit) {
//     inviteSubmit.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent default form submission

//         handleinvite();
//     });
// } else {
//     console.error('Element with id "invite_user" not found');
// }

// function handleinvite() {
//     const inviteName = document.getElementById("invite_name").value;
//     const inviteEmail = document.getElementById("invite_email").value;

//     // console.log('inviteName:', inviteName);
//     // console.log('inviteEmail:', inviteEmail);

//     // Send data to backend using fetch
//     fetch(`https://team-org-backend.onrender.com/invite-user/${user_id}`, {
//         method: 'POST',
//         headers: {
//             'accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: inviteName,
//             email: inviteEmail
//         })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // console.log('Success:', data);

//             // Show success message
//             showSuccessMessage();

//             // Clear input fields
//             document.getElementById("invite_name").value = '';
//             document.getElementById("invite_email").value = '';
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Handle errors here, show error message
//         });
// }

// function showSuccessMessage() {
//     const successMessage = document.querySelector('h1');
//     successMessage.style.display = 'block'; // Show the success message

//     setTimeout(() => {
//         successMessage.style.display = 'none'; // Hide the success message after 3 seconds
//     }, 3000);
// }

console.log('running invite');

const user_id = localStorage.getItem('user_id');
const inviteSubmit = document.getElementById("invite_user");
const inviteText = document.getElementById('invite_text');
const inviteSpinnerContainer = document.getElementById('invite_spinner_container');

if (inviteSubmit) {
    inviteSubmit.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission

        inviteSpinnerContainer.style.display = 'inline-block'; // Show the spinner
        inviteText.style.display = 'none'; // Hide the invite text
        handleinvite();
    });
} else {
    console.error('Element with id "invite_user" not found');
}

function handleinvite() {
    const inviteName = document.getElementById("invite_name").value;
    const inviteEmail = document.getElementById("invite_email").value;

    fetch(`https://team-org-backend.onrender.com/invite-user/${user_id}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inviteName,
            email: inviteEmail
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showSuccessMessage();

        // Clear input fields
        document.getElementById("invite_name").value = '';
        document.getElementById("invite_email").value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        inviteSpinnerContainer.style.display = 'none'; // Hide the spinner
        inviteText.style.display = 'inline-block'; // Show the invite text
    });
}

function showSuccessMessage() {
    const successMessage = document.querySelector('h1');
    successMessage.style.display = 'block'; // Show the success message

    setTimeout(() => {
        successMessage.style.display = 'none'; // Hide the success message after 3 seconds
    }, 3000);
}
