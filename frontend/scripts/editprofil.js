


// const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
// const admin = document.getElementById('admin')
// if (!isAdmin) {
//   admin.classList.add("hidden");
// }
const user_id = localStorage.getItem('user_id')
// console.log(user_id)

function  profileData(){
    fetch(`https://team-org-backend.onrender.com/my-profile/${user_id}`,{
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(item => {
        // console.log('Success:', item);
        // console.log(item.data.name)

        const dataName =  item.data.name;
        const  userName= document.getElementById('edit_user_name');
        userName.value= dataName;

        const dataEmail =  item.data.email;
        const  userEmail= document.getElementById('edit_user_email');
        userEmail.value= dataEmail;

        const dataMobile =  item.data.mobile;
        const  userMobile= document.getElementById('edit_user_number');
        userMobile.value= dataMobile;
        
      }).catch(error => {
        console.error('Error:', error);
      });
}

profileData();








// const user_id = localStorage.getItem('user_id')
// console.log(user_id)

console.log('edit profil script is running');

const editDone = document.getElementById('edit_done')
const doneText = document.getElementById("done_text");
const spinnerContainer = document.getElementById("spinner_container");
if (editDone) {
    editDone.addEventListener('click', (e) => {
        e.preventDefault();
        spinnerContainer.style.display = 'inline-block'; // Show the spinner
        doneText.style.display = 'none';
        handleEdit()
    })
} else {
    console.error('Element with id "edit_done" not found');
}




function handleEdit() {

    const setName = document.getElementById('edit_user_name').value;
    const setEmail = document.getElementById('edit_user_email').value;
    const setNumber = document.getElementById('edit_user_number').value;


    console.log('userName :', setName)
    console.log('userEmail :', setEmail)
    console.log('userNumber :', setNumber)


    fetch(`https://team-org-backend.onrender.com/update-profile/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },

        body: JSON.stringify({
            name: setName,
            email: setEmail,
            mobile: setNumber
        })
    }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        console.log('Success:', data);
       
        window.location.href = "profile.html"
      }).catch(error => {
        console.error('Error:', error);
      }).finally(() => {
        spinnerContainer.style.display = 'none'; // Hide the spinner
        doneText.style.display = 'inline-block'; 
      });

}