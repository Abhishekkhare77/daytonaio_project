
//-----------Register form -----------//


// const RegisterSubmit = document.getElementById('Register_submit')

// if (RegisterSubmit) {
//   RegisterSubmit.addEventListener('click', (e) => {
//     e.preventDefault()
//     registerFun()

//   })
// } else {
//   console.error('Element with id "Register_submit" not found');
// }


// function registerFun() {

//   const Register_Name = document.getElementById('Register_name').value;
//   const Mobile_num = document.getElementById('Register_Mob_Num').value;
//   const Register_Email = document.getElementById('Register_email').value;
//   const Register_Password = document.getElementById('Register_Pass').value;


//   // console.log('Register_Name', Register_Name)
//   // console.log(' Mobile_num', Mobile_num)
//   // console.log('Register_Email', Register_Email)
//   // console.log('Register_Password', Register_Password)


//   fetch('https://team-org-backend.onrender.com/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'accept': 'application/json'
//     },
//     body: JSON.stringify({
//       name: Register_Name,
//       email: Register_Email,
//       password: Register_Password,
//       mobile: Mobile_num,
//     })
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }).then(data => {
//     // console.log('Success:', data);
//     const user_id = data.id;
//     // const  user_role = data.user_role;
//     localStorage.setItem('user_id',user_id)
//      localStorage.setItem(
//       'user_role','admin'
//      );
//     window.location.href = "createOrg.html"
//   }).catch(error => {
//     console.error('Error:', error);
//   });

// }


const RegisterSubmit = document.getElementById('Register_submit');
const registerText = document.getElementById('register_text');
const registerSpinnerContainer = document.getElementById('register_spinner_container');

if (RegisterSubmit) {
  RegisterSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    registerSpinnerContainer.style.display = 'inline-block'; // Show the spinner
    registerText.style.display = 'none'; // Hide the register text
    registerFun();
  });
} else {
  console.error('Element with id "Register_submit" not found');
}

function registerFun() {
  const Register_Name = document.getElementById('Register_name').value;
  const Mobile_num = document.getElementById('Register_Mob_Num').value;
  const Register_Email = document.getElementById('Register_email').value;
  const Register_Password = document.getElementById('Register_Pass').value;

  // console.log('Register_Name', Register_Name)
  // console.log(' Mobile_num', Mobile_num)
  // console.log('Register_Email', Register_Email)
  // console.log('Register_Password', Register_Password)

  fetch('https://team-org-backend.onrender.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      name: Register_Name,
      email: Register_Email,
      password: Register_Password,
      mobile: Mobile_num,
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
      const user_id = data.id;
      // const  user_role = data.user_role;
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user_role', 'admin');
      window.location.href = "createOrg.html";
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      registerSpinnerContainer.style.display = 'none'; // Hide the spinner
      registerText.style.display = 'inline-block'; // Show the register text
    });
}
