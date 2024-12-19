
// const user_id = localStorage.getItem('user_id')
// console.log(user_id)
// const org_id = localStorage.getItem('org_id')
// console.log(org_id)


// function templatesData() {
//     fetch(`https://team-org-backend.onrender.com/get-all-task-template/${org_id}`, {
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
//             console.log('Success:', item.template_title);
//             const tempData = item;
//             console.log('tempData', tempData);
//             renderTemplateCards(tempData);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// function renderTemplateCards(templates) {
//     const tempContainer = document.getElementById('temp_container');
//     tempContainer.innerHTML = ''; // Clear existing user cards

//     templates.forEach(temp => {
//         const tempdetail = document.createElement('div');
//         tempdetail.classList.add('mt-4', 'flex', 'w-full', 'item-center', 'justfy-center');
//         tempdetail.id = `temp-${temp._id}`;

//         tempdetail.addEventListener('click', () => {
//             console.log('Clicked task id:', tempdetail.id);
//             // Store the id in local storage for use in the next page
//             sessionStorage.setItem('selectedtempId', temp._id);
//             window.location.href = "./addtask.html";
//         });

//         console.log('task template_task_duration', temp.template_task_duration);

//         const tempLogo = document.createElement('div');
//         tempLogo.classList.add('text-center', 'mt-0.5');

//         const tempTitle = document.createElement('div');
//         tempTitle.classList.add('h-full', 'w-full', 'ml-2');

//         const tempIconDate = document.createElement('div');
//         tempIconDate.classList.add('flex', 'item-center', 'justify-between');

//         const title = document.createElement('h1');
//         title.classList.add('font-bold');
//         title.textContent = temp.template_title;

//         const createdTime = document.createElement('div');

//         const date = new Date(temp.created_at);

//         const monthNames = [
//             'January', 'February', 'March', 'April', 'May', 'June',
//             'July', 'August', 'September', 'October', 'November', 'December'
//         ];

//         const day = date.getDate();
//         const month = monthNames[date.getMonth()];
//         const year = date.getFullYear();

//         const formattedDate = `${day} ${month} ${year}`;

//         createdTime.textContent = formattedDate;

//         const imgElement = document.createElement('img');
//         imgElement.classList.add('h-7', 'w-8');
//         imgElement.src = temp.template_platform; // Set the source of the image
//         imgElement.alt = 'logo';

//         const Icon = deleteLogo();

//         // Add event listener to the delete icon
//         Icon.addEventListener('click', (event) => {
//             event.stopPropagation(); // Prevent the parent click event from firing
//             console.log('Clicked delete icon for task id:', tempdetail.id);
//             handleDelete(temp._id); // Pass the task id to the delete function
//         });

//         tempLogo.appendChild(imgElement);

//         tempTitle.appendChild(title);
//         tempTitle.appendChild(tempIconDate);

//         tempIconDate.appendChild(createdTime);
//         tempIconDate.appendChild(Icon);

//         tempdetail.appendChild(tempLogo);
//         tempdetail.appendChild(tempTitle);

//         tempContainer.appendChild(tempdetail);
//     });
// }

// function deleteLogo() {
//     const svgString = `   <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

//     const parser = new DOMParser();
//     const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
//     return svgElement;
// }

// function handleDelete(tempId) {
//     fetch(`https://team-org-backend.onrender.com/delete-task-template/${tempId}/${user_id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     }).then(data => {
//         console.log('Success:', data);
//         // Optionally, you can refresh the list of templates
//         templatesData();
//     }).catch(error => {
//         console.error('Error:', error);
//     });
// }

// templatesData();


//-------------------------------------

const user_id = localStorage.getItem('user_id');
// console.log(user_id);
const org_id = localStorage.getItem('org_id');
// console.log(org_id);

function templatesData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader
    fetch(`https://team-org-backend.onrender.com/get-all-task-template/${org_id}`, {
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
            // console.log('Success:', item.template_title);
            const tempData = item;
            // console.log('tempData', tempData);
            renderTemplateCards(tempData);
        })
        .catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            loader.style.display = 'none'; // Hide loader
        });
}

function renderTemplateCards(templates) {
    const tempContainer = document.getElementById('temp_container');
    tempContainer.innerHTML = ''; // Clear existing user cards

    templates.reverse().forEach(temp => {
        const tempdetail = document.createElement('div');
        tempdetail.classList.add('mt-2', 'flex', 'w-full', 'item-center', 'justfy-center','cursor-pointer','hover:bg-white','hover:shadow-md','py-0.5','px-1','rounded-sm' );
        tempdetail.id = `temp-${temp._id}`;

        tempdetail.addEventListener('click', () => {
            console.log('Clicked task id:', tempdetail.id);
            // Store the id in local storage for use in the next page
            sessionStorage.setItem('selectedtempId', temp._id);
            window.location.href = "./addtask.html";
        });

        // console.log('task template_task_duration', temp.template_task_duration);

        const tempLogo = document.createElement('div');
        tempLogo.classList.add('text-center', 'mt-0.5');

        const tempTitle = document.createElement('div');
        tempTitle.classList.add('h-full', 'w-full', 'ml-2');

        const tempIconDate = document.createElement('div');
        tempIconDate.classList.add('flex', 'item-center', 'justify-between');

        const title = document.createElement('h1');
        title.classList.add('font-bold');
        title.textContent = temp.template_title;

        const createdTime = document.createElement('div');

        const date = new Date(temp.created_at);

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        createdTime.textContent = formattedDate;

        const imgElement = document.createElement('img');
        imgElement.classList.add('h-7', 'w-8');
        imgElement.src = temp.template_platform; // Set the source of the image
        imgElement.alt = 'logo';

        const Icon = deleteLogo();
        const loader = createLoader();

        // Add event listener to the delete icon
        Icon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the parent click event from firing
            // console.log('Clicked delete icon for task id:', tempdetail.id);
            handleDelete(temp._id, Icon, loader); // Pass the task id, delete icon, and loader to the delete function
        });

        tempLogo.appendChild(imgElement);

        tempTitle.appendChild(title);
        tempTitle.appendChild(tempIconDate);

        tempIconDate.appendChild(createdTime);
        tempIconDate.appendChild(Icon);
        tempIconDate.appendChild(loader);

        tempdetail.appendChild(tempLogo);
        tempdetail.appendChild(tempTitle);

        tempContainer.appendChild(tempdetail);
    });
}

function deleteLogo() {
    const svgString = `   <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

function createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.style.display = 'none'; // Hide loader initially

    loader.innerHTML = `
 <svg width="16px" height="16px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a7" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FF156D"></stop><stop offset=".3" stop-color="#FF156D" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FF156D" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FF156D" stop-opacity=".3"></stop><stop offset="1" stop-color="#FF156D" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a7)" stroke-width="30" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FF156D" stroke-width="30" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
    `;
    return loader;
}

function handleDelete(tempId, deleteIcon, loader) {
    deleteIcon.style.display = 'none';
    loader.style.display = 'block';

    fetch(`https://team-org-backend.onrender.com/delete-task-template/${tempId}/${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        // console.log('Success:', data);
        // Optionally, you can refresh the list of templates
        templatesData();
    }).catch(error => {
        console.error('Error:', error);
    }).finally(() => {
        // Hide loader and show delete icon
        deleteIcon.style.display = 'block';
        loader.style.display = 'none';
    });
}

templatesData();
