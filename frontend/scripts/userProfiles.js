console.log("script running..")

// const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
// const admin = document.getElementById('admin')
// if (!isAdmin) {
//   admin.classList.add("hidden");
// // }
const selatedUser_id = localStorage.getItem('selectedUserId')
// console.log(selatedUser_id)

function profileData() {
  fetch(`https://team-org-backend.onrender.com/my-profile/${selatedUser_id}`, {
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

      const dataName = item.data.name;
      const userName = document.getElementById('user_name');
      userName.textContent = dataName;

      const dataEmail = item.data.email;
      const userEmail = document.getElementById('user_mail');
      userEmail.textContent = dataEmail;

      const dataMobile = item.data.mobile;
      const userMobile = document.getElementById('user_phone');
      userMobile.textContent = dataMobile;



      const dataReward = item.data.points_earned;
      const taskPoints = document.getElementById('task_rewards');
      taskPoints.textContent = dataReward;

      const dataComplete = item.data.tasks_completed;
      // console.log('dataComplete', dataComplete)
      const taskComplete = document.getElementById('task_complete');
      taskComplete.textContent = dataComplete.length == 0 ? 0 : dataComplete.length


   
      const pendingtask = item.data.tasks_pending
      // console.log('pendingtask:', pendingtask)
      const taskLength = pendingtask.length
      const taskPoint = document.getElementById('pending_tasks');
      taskPoint.textContent = taskLength;



    }).catch(error => {
      console.error('Error:', error);
    });
}

profileData();

document.getElementById('copy_icon').addEventListener('click', () => {
  const tick = document.getElementById('tick');
  const taskContent = document.getElementById('user_mail').textContent;
  const copyIcon = document.getElementById('copy_icon');

  // Hide the copy icon and show the tick icon
  // console.log(' copyIcon.style.display = none;')
  copyIcon.style.display = 'none';
  tick.style.display = 'block';

  navigator.clipboard.writeText(taskContent)
    .then(() => {
      // console.log('Content copied to clipboard:', taskContent);
      // Hide the tick icon and show the copy icon after 2 seconds
      setTimeout(() => {
        // console.log(' copyIcon.style.display = block;')
        tick.style.display = 'none';
        copyIcon.style.display = 'block';
      }, 2000);
      // Optional: Call an onCopy function or show a notification
      // onCopy(taskContent);
    })
    .catch((error) => {
      console.error('Failed to copy content: ', error);
      // Hide the tick icon and show the copy icon after 2 seconds
      setTimeout(() => {
        // console.log(' copyIcon.style.display = block;')
        tick.style.display = 'none';
        copyIcon.style.display = 'block';
      }, 2000);
    });
});
