console.log("task running ")

const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
const editTaskBtn = document.getElementById('edit_Task_btn')
const deleteTaskbtn = document.getElementById('delete_task')
const allFeedback = document.getElementById('all_feedback')
const userTaskAssigned = document.getElementById('user_task_assigned')
if (!isAdmin) {
  editTaskBtn.classList.add("hidden");
  deleteTaskbtn.classList.add("hidden");
  allFeedback.classList.add("hidden");
  userTaskAssigned.classList.add("hidden");
}

const isMember = localStorage.getItem('user_role') === "member" ? true : false;
const doneTaskBtn = document.getElementById('done_task')
if (!isMember) {
  doneTaskBtn.classList.add("hidden");
}


const user_id = localStorage.getItem('user_id')
// console.log(user_id)

const task_id = localStorage.getItem('selectedTaskId')
// console.log(task_id)

function taskData() {
  fetch(`https://team-org-backend.onrender.com/get-task/${task_id}/${user_id}`, {
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
      console.log('Success:', item);


      const dataTitle = item.task_title;
      const taskTitle = document.getElementById('task_title');
      if (taskTitle) taskTitle.textContent = dataTitle;

      const dataDescription = item.task_description;
      console.log(dataDescription);
      const taskDescription = document.getElementById('task_desc')
      if (taskDescription) taskDescription.textContent = dataDescription;

      const dataContent = item.task_content;
      const taskContent = document.getElementById('task_content');
      
      const maxLength = 100; // Define the maximum length of characters to display
      
      if (taskContent) {
        if (dataContent.length > maxLength) {
          taskContent.textContent = dataContent.substring(0, maxLength) + '...';
        } else {
          taskContent.textContent = dataContent;
        }
      }


      const dataDuration = item.task_duration;
      const taskMin = dataDuration / 60
      const taskDuration = document.getElementById('task_duration');
      if (taskDuration) taskDuration.textContent = taskMin;

    

      const date = new Date(item.deadline);

      const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      const formattedDate = `${day} ${month} ${year}`;

      const taskdeadline = document.getElementById('task_deadline');
      if (taskdeadline) taskdeadline.textContent = formattedDate;

      const dataLink = item.url_link;
      const taskUrl = document.getElementById('url_link');
      if (taskUrl) taskUrl.textContent = dataLink;

      const urlLink = item.url_link;
      console.log('urlLink', urlLink)
      const hreftag = document.getElementById('url_link');
      hreftag.href = urlLink;

      console.log()


    }).catch(error => {
      console.error('Error:', error);
    });
}

taskData();



document.getElementById('copy_icon').addEventListener('click', () => {
  const tick = document.getElementById('tick');
  const taskContent = document.getElementById('task_content').textContent;
  const copyIcon = document.getElementById('copy_icon');

  // Hide the copy icon and show the tick icon
  console.log(' copyIcon.style.display = none;')
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





//---------------------
const deleteTask = document.getElementById("delete_task");

if (deleteTask) {
  deleteTask.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    handleDelete();
  });
} else {
  console.error('Element with id "login_submit" not found');
}
document.getElementById("delete_task").addEventListener("click", handleDelete);

function handleDelete() {
  const deleteIcon = document.getElementById("delete_icon");
  const loader = document.getElementById("loader");

  // Show loader and hide delete icon
  deleteIcon.style.display = "none";
  loader.style.display = "block";

  fetch(`https://team-org-backend.onrender.com/delete-task/${task_id}/${user_id}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(item => {
      console.log('Success:', item);
      window.location.href = "./popup.html";
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      // Hide loader and show delete icon
      deleteIcon.style.display = "block";
      loader.style.display = "none";
    });
}
