console.log('scripts.js')


const user_id = localStorage.getItem('user_id')
console.log( 'user id',user_id)

const task_id = localStorage.getItem('selectedTaskId')
console.log('task id',task_id)



const edittaskSubmit = document.getElementById("edit_task_submit");
const updateTaskText = document.getElementById("updateTask_text");
const spinnerContainer = document.getElementById("spinner_container");

if (edittaskSubmit) {
    edittaskSubmit.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission
        spinnerContainer.style.display = 'inline-block'; // Show the spinner
        updateTaskText.style.display = 'none';
        handleSubmit();
    });
} else {
    console.error('Element with id "login_submit" not found');
}

function handleSubmit() {
    const edittaskName = document.getElementById("edit_task_name").value;
    const edittaskDescription = document.getElementById("edit_task_description").value;
    const edittaskContent = document.getElementById("edit_task_content").value;
    const edittaskPlatform = document.getElementById("edit_task_platform").value;
    const edittaskLink = document.getElementById("edit_task_link").value;
    const edittaskPriortiy = document.getElementById("edit_task_priortiy").value;
    const edittaskDuration = document.getElementById("edit_task_duration").value;
    const edittaskDeadline = document.getElementById("edit_task_deadline").value;
    const edittaskReward = document.getElementById("edit_task_reward").value;
    // const edittaskNotification = document.getElementById("edit_task_notification").checked;
    // const edittaskTemp = document.getElementById("edit_task_temp").checked;
       
    console.log('edittaskName:', edittaskName);
    console.log('edittaskDescription:', edittaskDescription);
    console.log('edittaskContent:', edittaskContent);
    console.log('edittaskPlatform:', edittaskPlatform);
    console.log('edittaskLink:', edittaskLink);
    console.log('edittaskPriortiy:', edittaskPriortiy);
    console.log('edittaskDuration:', edittaskDuration);
    console.log('edittaskDeadline:', edittaskDeadline);
    console.log('edittaskReward:', edittaskReward);
    // console.log('edittaskNotification:', edittaskNotification);
    // console.log('edittaskTemp:', edittaskTemp);

    const user_id = localStorage.getItem('user_id')
    // console.log(user_id)


    // Send data to backend using fetch
    fetch(`https://team-org-backend.onrender.com/update-task/${task_id}/${user_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },




        body: JSON.stringify({
            task_title: edittaskName,
            task_description: edittaskDescription,
            task_content: edittaskContent,
            task_rewards: edittaskReward,
            task_platform: edittaskPlatform,
            task_duration: edittaskDuration,
            deadline: edittaskDeadline,
            priority: edittaskPriortiy,
            url_link: edittaskLink,
            send_notification: false,
            isTemplate: false
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
         
            window.location.href = "./task.html";
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here, show error message
        }).finally(() => {
            spinnerContainer.style.display = 'none'; // Hide the spinner
            updateTaskText.style.display = 'inline-block'; // Show the login text
          });;
}




function  taskData(){
    fetch(`https://team-org-backend.onrender.com/get-task/${task_id}/${user_id}`,{
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
       

        const dataTitle = item.task_title;
        const edittaskName = document.getElementById("edit_task_name");
        if (edittaskName) edittaskName.value = dataTitle;

        const dataDescription = item.task_description;
        console.log(dataDescription);
        const edittaskDescription = document.getElementById("edit_task_description")
        if (edittaskDescription) edittaskDescription.value = dataDescription;

        const dataContent = item.task_content;
        const edittaskContent = document.getElementById("edit_task_content");
        if (edittaskContent) edittaskContent.value = dataContent;

        const dataDuration = item.task_duration;
        const edittaskDuration = document.getElementById("edit_task_duration")
        if (edittaskDuration) edittaskDuration.value = dataDuration;

        // console.log( 'dataDuration',dataDuration)



        const dataLink = item.url_link;
       const edittaskLink = document.getElementById("edit_task_link");
        if (edittaskLink) edittaskLink.value = dataLink;



        const tempReward = item.task_rewards;
        const edittaskReward = document.getElementById("edit_task_reward");
        if (edittaskReward) edittaskReward.value = tempReward;


        const tempPlatform = item.task_platform;
       const edittaskPlatform = document.getElementById("edit_task_platform");
        if (edittaskPlatform) edittaskPlatform.value = tempPlatform;

        const tempPriority = item.priority;
        const edittaskPriortiy = document.getElementById("edit_task_priortiy");
        if (edittaskPriortiy) edittaskPriortiy.value = tempPriority;

        const tempDeadline = item.deadline;
         const edittaskDeadline = document.getElementById("edit_task_deadline");

        // Parse the date string into a JavaScript Date object
        const date = new Date(tempDeadline);

        // Extract the day, month, and year from the Date object
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
        const year = date.getFullYear();

        // Format the date as yyyy-MM-dd
        const formattedDate = `${year}-${month}-${day}`;

        if (edittaskDeadline) edittaskDeadline.value = formattedDate;
        // console.log('date :', formattedDate);

        // console.log()


        
      }).catch(error => {
        console.error('Error:', error);
      });
}

taskData();
