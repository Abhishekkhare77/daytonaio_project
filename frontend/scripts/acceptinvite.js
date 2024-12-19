
// console.log('running invitation')

const acceptinvite = document.getElementById('done_accept')
const doneText = document.getElementById("done_text");
const spinnerContainer = document.getElementById("spinner_container");

if (acceptinvite) {
    acceptinvite.addEventListener('click', (e) => {
        e.preventDefault()
        spinnerContainer.style.display = 'inline-block'; // Show the spinner
        doneText.style.display = 'none';
        handleInvitation()

    })
} else {
    console.error('Element with id "Register_submit" not found');
}


function handleInvitation() {


    const enterToken = document.getElementById('invitation_token').value;

    const enterNum = document.getElementById('enter_number').value;

    const setPassword = document.getElementById('set_password').value;


    // console.log(' enterNum', setPassword)

    // console.log('setPassword', setPassword)


    fetch(`https://team-org-backend.onrender.com/accept-invitation/${enterToken}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({

            mobile: enterNum,
            password: setPassword
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        // console.log('Success:', data);
        window.location.href = "login.html"
    }).catch(error => {
        console.error('Error:', error);
    }) .finally(() => {
        spinnerContainer.style.display = 'none'; // Hide the spinner
        doneText.style.display = 'inline-block'; // Show the login text
      });
}