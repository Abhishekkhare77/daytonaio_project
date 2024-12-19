

//     console.log('popup running');

// const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
// const addtask = document.getElementById('add_task');
// if (!isAdmin) {
//     addtask.classList.add("hidden");
// }

// const user_id = localStorage.getItem('user_id');
// // console.log(user_id);

// let allTasks = []; // Store all tasks globally

// function alltaskData() {
//     fetch(`https://team-org-backend.onrender.com/${isAdmin ? "get-admin-created-task" : "user-tasks"}/${user_id}`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json'
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(item => {
//             // console.log('Success:', item.tasks);
//             allTasks = item.tasks;
//             renderTasksCards(allTasks);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }
// function renderTasksCards(tasks) {
//     const tempContainer = document.getElementById('task_container');
//     tempContainer.innerHTML = ''; // Clear existing task cards

//     if (tasks.length === 0) {
//         const noTasksMessage = document.createElement('h1');
//         noTasksMessage.style.textAlign = 'center';
//         noTasksMessage.classList.add('w-full');
//         noTasksMessage.textContent = 'No Task Available';
//         tempContainer.appendChild(noTasksMessage);
//         return;
//     }

//     tasks.reverse().forEach(task => { // Reverse the tasks array before iterating
//         const tempdetail = document.createElement('div');
//         tempdetail.classList.add('mt-2', 'flex', 'w-full', 'items-center', 'justify-center', 'bg-[#FAFAFA]', 'p-1', 'cursor-pointer','hover:bg-white','hover:shadow-md','py-2','rounded-sm');
//         tempdetail.id = `task-${task._id}`;

//         tempdetail.addEventListener('click', () => {
//             // Store the id in local storage for use in the next page
//             localStorage.setItem('selectedTaskId', task._id);
//             window.location.href = "./task.html";
//         });

//         const tempLogo = document.createElement('div');
//         tempLogo.classList.add('text-center', 'mt-0.5');

//         const tempTitle = document.createElement('div');
//         tempTitle.classList.add('h-full', 'w-full', 'ml-2');

//         const title = document.createElement('h1');
//         title.classList.add('font-bold');
//         title.textContent = task.task_title;

//         // Check if the task deadline is less than the current date
//         const currentDate = new Date();
//         const deadlineDate = new Date(task.deadline);

//         if (deadlineDate < currentDate) {
//             title.style.color = 'red'; // Set the task title color to red
//         }

//         const separator = document.createElement('hr');

//         const createdTime = document.createElement('div');
//         createdTime.classList.add('flex', 'justify-between', 'w-full', 'text-xs');

//         const date = new Date(task.created_at);

//         const monthNames = [
//             'January', 'February', 'March', 'April', 'May', 'June',
//             'July', 'August', 'September', 'October', 'November', 'December'
//         ];

//         const day = date.getDate();
//         const month = monthNames[date.getMonth()];
//         const year = date.getFullYear();

//         const formattedDate = `${day} ${month} ${year}`;

//         createdTime.textContent = formattedDate;

//         const icon = document.createElement('div');
//         icon.id = 'edit_icon';
//         icon.classList.add('mt-1', 'mr-1.5');

//         const imgElement = document.createElement('img');
//         imgElement.classList.add('h-7', 'w-8');
//         imgElement.src = task.task_platform; // Set the source of the image
//         imgElement.alt = 'logo';

//         const editIcon = editsvg();

//         if (isAdmin) {
//             icon.appendChild(editIcon);
//         }
//         createdTime.appendChild(icon);

//         tempLogo.appendChild(imgElement);
//         tempTitle.appendChild(title);
//         tempTitle.appendChild(createdTime);

//         tempdetail.appendChild(tempLogo);
//         tempdetail.appendChild(tempTitle);

//         tempContainer.appendChild(tempdetail);
//         tempdetail.appendChild(separator);
//     });
// }


// function editsvg() {
//     const svgString = `<svg viewBox="0 0 20 20" height="10px" width="10px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
//         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
//         <g id="SVGRepo_iconCarrier">
//           <path
//             d="M14.846 1.403l3.752 3.753.625-.626A2.653 2.653 0 0015.471.778l-.625.625zm2.029 5.472l-3.752-3.753L1.218 15.028 0 19.998l4.97-1.217L16.875 6.875z"
//             fill="#5C5F62"></path>
//         </g>
//       </svg>`;

//     const parser = new DOMParser();
//     const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
//     return svgElement;
// }

// alltaskData();

// function filterTask() {
//     const searchInput = document.getElementById('default_search').value.toLowerCase();
//     const filteredTasks = allTasks.filter(task => task.task_title.toLowerCase().includes(searchInput));
//     renderTasksCards(filteredTasks);
// }

// document.getElementById('default_search').addEventListener('input', filterTask);



console.log('popup running');

const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
const addtask = document.getElementById('add_task');
if (!isAdmin) {
    addtask.style.display = 'none';
}

const user_id = localStorage.getItem('user_id');
let allTasks = []; // Store all tasks globally

function alltaskData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    fetch(`https://team-org-backend.onrender.com/${isAdmin ? "get-admin-created-task" : "user-tasks"}/${user_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(item => {
            allTasks = item.tasks;
            renderTasksCards(allTasks);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            loader.style.display = 'none'; // Hide loader
        });
}

function renderTasksCards(tasks) {
    const tempContainer = document.getElementById('task_container');
    tempContainer.innerHTML = ''; // Clear existing task cards

    if (tasks.length === 0) {
        const noTasksMessage = document.createElement('h1');
        noTasksMessage.style.textAlign = 'center';
        noTasksMessage.classList.add('w-full');
        noTasksMessage.textContent = 'No Task Available';
        tempContainer.appendChild(noTasksMessage);
        return;
    }

    tasks.reverse().forEach(task => { // Reverse the tasks array before iterating
        const tempdetail = document.createElement('div');
        tempdetail.style.marginTop = '0.5rem';
        tempdetail.style.display = 'flex';
        tempdetail.style.width = '100%';
        tempdetail.style.alignItems = 'center';
        tempdetail.style.justifyContent = 'center';
        tempdetail.style.backgroundColor = '#FAFAFA';
        tempdetail.style.padding = '0.25rem';
        tempdetail.style.cursor = 'pointer';
        tempdetail.style.transition = 'background-color 0.2s, box-shadow 0.2s';
        tempdetail.style.paddingTop = '0.5rem';
        tempdetail.style.borderRadius = '0.25rem';
        tempdetail.id = `task-${task._id}`;

        tempdetail.addEventListener('click', () => {
            // Store the id in local storage for use in the next page
            localStorage.setItem('selectedTaskId', task._id);
            window.location.href = "./task.html";
        });

        const tempLogo = document.createElement('div');
        tempLogo.style.textAlign = 'center';
        tempLogo.style.marginTop = '0.125rem';

        const tempTitle = document.createElement('div');
        tempTitle.style.height = '100%';
        tempTitle.style.width = '100%';
        tempTitle.style.marginLeft = '0.5rem';

        const title = document.createElement('h1');
        title.style.fontWeight = 'bold';
        title.textContent = task.task_title;

        // Check if the task deadline is less than the current date
        const currentDate = new Date();
        const deadlineDate = new Date(task.deadline);

        if (deadlineDate < currentDate) {
            title.style.color = 'red'; // Set the task title color to red
        }

        const separator = document.createElement('hr');

        const createdTime = document.createElement('div');
        createdTime.style.display = 'flex';
        createdTime.style.justifyContent = 'space-between';
        createdTime.style.width = '100%';
        createdTime.style.fontSize = '0.75rem';

        const date = new Date(task.created_at);

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        createdTime.textContent = formattedDate;

        const icon = document.createElement('div');
        icon.id = 'edit_icon';
        icon.style.marginTop = '0.25rem';
        icon.style.marginRight = '0.375rem';

        const imgElement = document.createElement('img');
        imgElement.style.height = '1.75rem';
        imgElement.style.width = '2rem';
        imgElement.src = task.task_platform; // Set the source of the image
        imgElement.alt = 'logo';

        const editIcon = editsvg();

        if (isAdmin) {
            icon.appendChild(editIcon);
        }
        createdTime.appendChild(icon);

        tempLogo.appendChild(imgElement);
        tempTitle.appendChild(title);
        tempTitle.appendChild(createdTime);

        tempdetail.appendChild(tempLogo);
        tempdetail.appendChild(tempTitle);

        tempContainer.appendChild(tempdetail);
        tempdetail.appendChild(separator);
    });
}

function editsvg() {
    const svgString = `<svg viewBox="0 0 20 20" height="10px" width="10px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M14.846 1.403l3.752 3.753.625-.626A2.653 2.653 0 0015.471.778l-.625.625zm2.029 5.472l-3.752-3.753L1.218 15.028 0 19.998l4.97-1.217L16.875 6.875z"
            fill="#5C5F62"></path>
        </g>
      </svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

alltaskData();

function filterTask() {
    const searchInput = document.getElementById('default_search').value.toLowerCase();
    const filteredTasks = allTasks.filter(task => task.task_title.toLowerCase().includes(searchInput));
    renderTasksCards(filteredTasks);
}

document.getElementById('default_search').addEventListener('input', filterTask);