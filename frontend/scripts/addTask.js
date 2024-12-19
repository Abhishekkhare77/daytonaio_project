console.log('scripts.js');

const user_id = localStorage.getItem('user_id');
// console.log(user_id);

const taskSubmit = document.getElementById("task_submit");
const addTaskText = document.getElementById("addTask_text");
const spinnerContainer = document.getElementById("spinner_container");

if (taskSubmit) {
    taskSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        spinnerContainer.style.display = 'inline-block'; // Show the spinner
        addTaskText.style.display = 'none';
        handleSubmit();
        handleTemp();
    });
} else {
    console.error('Element with id "login_submit" not found');
}

function handleSubmit() {
    const taskName = document.getElementById("task_name").value;
    const taskDescription = document.getElementById("task_description").value;
    const taskContent = document.getElementById("task_content").value;
    const taskPlatform = document.getElementById("task_platform").value;
    const taskLink = document.getElementById("task_link").value;
    const taskPriortiy = document.getElementById("task_priortiy").value;
    const taskDuration = document.getElementById("task_duration").value;
    const taskDeadline = document.getElementById("task_deadline").value;
    const taskReward = document.getElementById("task_reward").value;
    const taskNotification = document.getElementById("task_notification").checked;

    // console.log('running')

    // console.log('taskName:', taskName);
    // console.log('taskDescription:', taskDescription);
    // console.log('taskContent:', taskContent);
    // console.log('taskPlatform:', taskPlatform);
    // console.log('taskLink:', taskLink);
    // console.log('taskPriortiy:', taskPriortiy);
    // console.log('taskDuration:', taskDuration);
    // console.log('taskDeadline:', taskDeadline);
    // console.log('taskReward:', taskReward);
    // console.log('taskNotification:', taskNotification);

    // Send data to backend using fetch
    fetch(`https://team-org-backend.onrender.com/create-task/${user_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            task_title: taskName,
            task_description: taskDescription,
            task_content: taskContent,
            task_rewards: taskReward,
            task_platform: taskPlatform,
            deadline: taskDeadline,
            task_duration: taskDuration,
            priority: taskPriortiy,
            url_link: taskLink,
            send_notification: taskNotification,
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
            const task_id = data.task_id;
            localStorage.setItem('task_id', task_id);
            // Redirect to popup.html after successful login
            window.location.href = "./userAssigned.html";
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here, show error message
        }) .finally(() => {
            spinnerContainer.style.display = 'none'; // Hide the spinner
            addTaskText.style.display = 'inline-block'; // Show the login text
          });
}





function handleTemp() {
    const taskTemp = document.getElementById("task_temp").checked;

    if (taskTemp) {

        const taskName = document.getElementById("task_name").value;
        const taskDescription = document.getElementById("task_description").value;
        const taskContent = document.getElementById("task_content").value;
        const taskPlatform = document.getElementById("task_platform").value;
        const taskLink = document.getElementById("task_link").value;
        const taskPriortiy = document.getElementById("task_priortiy").value;
        const taskDuration = document.getElementById("task_duration").value;
        const taskDeadline = document.getElementById("task_deadline").value;
        const taskReward = document.getElementById("task_reward").value;
        const taskNotification = document.getElementById("task_notification").checked;

        // console.log('taskName:', taskName);
        // console.log('taskDescription:', taskDescription);
        // console.log('taskContent:', taskContent);
        // console.log('taskPlatform:', taskPlatform);
        // console.log('taskLink:', taskLink);
        // console.log('taskPriortiy:', taskPriortiy);
        // console.log('taskDuration:', taskDuration);
        // console.log('taskDeadline:', taskDeadline);
        // console.log('taskReward:', taskReward);
        // console.log('taskNotification:', taskNotification);

        const user_id = localStorage.getItem('user_id');
        // console.log(user_id);

        // Send data to backend using fetch
        fetch(`https://team-org-backend.onrender.com/create-task-template/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                template_title: taskName,
                template_description: taskDescription,
                template_platform: taskPlatform,
                template_task_content: taskContent,
                template_task_duration: taskDuration,
                template_task_platform_logo: taskPlatform,
                task_template_rewards: taskReward,
                task_template_deadline: taskDeadline,
                task_template_priority: taskPriortiy,
                task_template_url_link: taskLink,
                send_notification: taskNotification

            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Success:');
                // const task_id = data.task_id;
                // localStorage.setItem('task_id', task_id);
                // // Redirect to popup.html after successful login
                // window.location.href = "./userAssigned.html";
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors here, show error message
            });
    }
}


const temp_id = sessionStorage.getItem('selectedtempId');
// console.log(temp_id);

function taskData() {

    if (temp_id) {
        fetch(`https://team-org-backend.onrender.com/get-task-template/${temp_id}`, {
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


                const dataTitle = item.template_title;
                const taskTitle = document.getElementById('task_name');
                if (taskTitle) taskTitle.value = dataTitle;

                const dataDescription = item.template_description;
                console.log(dataDescription);
                const taskDescription = document.getElementById('task_description')
                if (taskDescription) taskDescription.value = dataDescription;

                const dataContent = item.template_task_content;
                const taskContent = document.getElementById('task_content');
                if (taskContent) taskContent.value = dataContent;

                const dataDuration = item.template_task_duration;
                const taskDuration = document.getElementById('task_duration');
                if (taskDuration) taskDuration.value = dataDuration;

                // console.log( 'dataDuration',dataDuration)

                const dataLink = item.task_template_url_link;
                const taskUrl = document.getElementById('task_link');
                if (taskUrl) taskUrl.value = dataLink;

                const tempReward = item.task_template_rewards;
                const reward = document.getElementById('task_reward');
                if (taskUrl) reward.value = tempReward;

                const tempPlatform = item.template_platform;
                const platform = document.getElementById('task_platform');
                if (taskUrl) platform.value = tempPlatform;

                const tempPriority = item.task_template_priority;
                const Priority = document.getElementById('task_priortiy');
                if (taskUrl) Priority.value = tempPriority;

                const tempDeadline = item.task_template_deadline;
                const deadline = document.getElementById('task_deadline');

                // Parse the date string into a JavaScript Date object
                const date = new Date(tempDeadline);

                // Extract the day, month, and year from the Date object
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
                const year = date.getFullYear();

                // Format the date as yyyy-MM-dd
                const formattedDate = `${year}-${month}-${day}`;

                if (taskUrl) deadline.value = formattedDate;
                // console.log('date :', formattedDate);

                // console.log()


            }).catch(error => {
                console.error('Error:', error);
            });
    }
}

taskData();



const backArrow = document.getElementById('back_arrow')

if (backArrow) {
    backArrow.addEventListener('click', (e) => {
        e.preventDefault()
        removeId()

    })
} else {
    console.error('Element with id "Register_submit" not found');
}

function removeId() {
    sessionStorage.removeItem('selectedtempId');
    window.location.href = "./choosetemplates.html";

}


