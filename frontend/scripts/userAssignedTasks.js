
//--------------------------------

console.log('User list running');

const task_id = localStorage.getItem('selectedTaskId');
// console.log(org_id);

let userData = [];

function organizationData() {
    fetch(`https://team-org-backend.onrender.com/get-all-assigned-users/${task_id}`, {
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
            console.log('Success:', item);
            console.log(item.users);

            userData = item.users;
            renderUserCards(userData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function renderUserCards(users) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear existing user cards

    users.forEach(user => {
        const userdetail = document.createElement('div');
        userdetail.classList.add('flex', 'mt-3.5' ,'-ml-2');

        const nameAndviews = document.createElement('div');
        nameAndviews.classList.add('flex', 'justify-between', 'px-2', 'w-full', 'item-center');

        const userdetail2 = document.createElement('div');
        userdetail2.classList.add('flex', 'flex-col', 'px-2', 'w-full');

        const userdetail3 = document.createElement('div');
        userdetail3.classList.add('flex');

        const userdetail4 = document.createElement('div');
        userdetail4.classList.add('mt-1', 'mr-1', 'text-center');

        const userViewCount = document.createElement('h1');
        userViewCount.classList.add('text-center' ,'flex'  );
        // userViewCount.textContent =user.times_viewed;

        const counts = document.createElement('h1');
        counts.textContent = user.times_viewed;

        const userviewIcon = createviewIcon()

        const viewTime = document.createElement('h1');
        viewTime.classList.add( 'mt-0.5','mr-0.5');
       

        viewTime.appendChild(userviewIcon)
        userViewCount.appendChild(viewTime)
        userViewCount.appendChild(counts)

        const userName = document.createElement('h1');
        userName.classList.add('font-bold');
        userName.textContent = user.user_name;

        const userEmail = document.createElement('p');
        userEmail.textContent = user.user_email;

        const tickIcon = createtickIcon()
        const crossIcon = createcrossIcon()

        const isTaskCompletedIcon = document.createElement('div');
      

        const userIcon = createUserIcon()
        const mailIcon = createMailIcon()

        const isTaskCompleted = user.isCompleted; // Set this based on your logic

        // Append the appropriate icon based on the task completion status
        if (isTaskCompleted) {
            isTaskCompletedIcon.appendChild(tickIcon);
        } else {
            isTaskCompletedIcon.appendChild(crossIcon);
        }

     

        userdetail.appendChild(isTaskCompletedIcon);
        userdetail.appendChild(userIcon);
        userdetail.appendChild(userdetail2);
        userdetail2.appendChild(nameAndviews);
        nameAndviews.appendChild(userName);
        nameAndviews.appendChild(userViewCount);

        userdetail2.appendChild(userdetail3);

        userdetail3.appendChild(userdetail4);
        userdetail3.appendChild(userEmail);

        userdetail4.appendChild(mailIcon);

        userContainer.appendChild(userdetail);
    });

    if (users.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'No results found.';
        userContainer.appendChild(noResultMessage);
    }
}

function createUserIcon() {
    const svgString = ` <svg height="36px" width="36px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508 508" xml:space="preserve"
              fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0">
              </g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                  <circle style="fill:#84DBFF;" cx="254" cy="254" r="254"></circle>
                  <path style="fill:#2B3B4E;"
                      d="M455.2,408.8C408.8,469.2,336,508,254,508S99.2,469.2,52.8,408.8l10.8-69.2l136.8-70.4 c0,0.4,0,1.2,0,1.6l-36,39.2l22,16.4l-27.2,14.4L254,490.4l94.8-149.6l-27.2-14.4l22-16.4l-36-38.8c0-0.4,0-0.8,0-1.6L444.4,340 L455.2,408.8z">
                  </path>
                  <g>
                      <path style="fill:#324A5E;"
                          d="M348.8,340.8L254,490.4l38.8-168c1.2,2,2,4.4,3.2,6.8c0,0,13.6-29.6,12-57.6l36,38.8l-22,16.4 L348.8,340.8z">
                      </path>
                      <path style="fill:#324A5E;"
                          d="M159.2,340.8l27.2-14.4l-22-16.4l35.6-38.8c-1.6,28.4,12,57.6,12,57.6c0.8-2.4,2-4.8,3.2-6.8 L254,490.4L159.2,340.8z">
                      </path>
                  </g>
                  <path style="fill:#E6E9EE;"
                      d="M292.8,322L254,490l-38.8-168c13.2-23.6,38.8-20.8,38.8-20.8l0,0C254,301.2,279.6,298.4,292.8,322z">
                  </path>
                  <g>
                      <path style="fill:#F1543F;"
                          d="M254.4,300.8C254,301.2,254,301.2,254.4,300.8c-0.4,0-0.4,0-0.4,0H254.4z"></path>
                      <path style="fill:#F1543F;"
                          d="M278,306.8l-8.8,19.2h-30l-9.2-19.2c12-6.8,24-5.2,24-5.2S266,300,278,306.8z">
                      </path>
                  </g>
                  <polygon style="fill:#FF7058;"
                      points="274.4,402 254,490 233.6,402 239.2,325.6 268.8,325.6 ">
                  </polygon>
                  <path style="fill:#F9B54C;"
                      d="M296,244.4c-1.6,8.8-9.2,27.2-42,56.8c-28.4-26.8-37.6-45.6-40.8-55.2c11.2,14.8,25.2,24.8,40.8,24.8 C270,270.8,284.4,260.4,296,244.4z">
                  </path>
                  <g>
                      <path style="fill:#FFFFFF;"
                          d="M296,328.8c-11.6-31.2-42-27.6-42-27.6c32.4-29.2,40.4-47.6,41.6-56.4c0.8-1.2,1.6-2,2.4-3.2 C321.2,273.6,296,328.8,296,328.8z">
                      </path>
                      <path style="fill:#FFFFFF;"
                          d="M254,301.2c0,0-30.4-3.6-42,27.6c0,0-25.6-55.6-2.4-87.2c1.2,1.6,2.4,3.2,3.6,4.8l0,0 C216.4,255.6,225.6,274.4,254,301.2z">
                      </path>
                  </g>
                  <path style="fill:#FFD05B;"
                      d="M325.6,201.2c-3.6,5.6-8.4,9.6-12.8,11.2c-11.6,31.6-33.6,58.4-58.8,58.4s-47.2-26.8-58.8-58.4 c-4.4-1.6-9.2-5.6-12.8-11.2c-6-9.6-6-20.4,0-24c0.4-0.4,1.2-0.4,2-0.8c1.2,6.8,2.8,13.2,4.8,18.8c0,0,5.2,9.6,6.4,18 c-0.4-9.6-0.8-29.6,2.4-33.6c0,0,14-24.4,3.6-46c0,0,2.4-32,38-17.2c0,0,6.8,1.6,14,2l0,0l0,0l0,0l0,0c6.8-0.4,14-2,14-2 c36-14.8,38.4,17.6,38.4,17.6c-10.4,21.6,3.6,46,3.6,46c3.2,4,2.8,24,2.4,33.6c1.2-8.4,6.4-18,6.4-18c2.4-5.2,4-12,4.8-18.8 c0.8,0,1.2,0.4,2,0.8C331.2,181.2,331.2,191.6,325.6,201.2z">
                  </path>
                  <path style="fill:#324A5E;"
                      d="M330,102.8c-2-3.2-11.6,2-11.6,2c1.2-7.2-3.2-23.2-3.2-23.2c-1.6,5.6-8,6.4-8,6.4 c0.8-5.2-5.6-19.2-5.6-19.2c1.2,6.4-8,12.8-8,12.8c1.6-5.2-10.8-23.2-10.8-23.2c2,2.8,1.2,10.8,1.2,10.8 c-4.4-9.2-16.8-18.4-16.8-18.4c0,2.4-1.2,4.8-3.2,6.8c-3.2-5.6-9.2-8.8-10.4-9.6l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0 c-1.2,0.4-7.6,3.6-10.4,9.6c-1.6-2-3.2-4.4-3.2-6.8c0,0-12.4,9.2-16.8,18.4c0,0-0.8-8,1.2-10.8c0,0-12.4,18-10.8,23.2 c0,0-9.2-6.4-8-12.8c0,0-6.4,14-5.6,19.2c0,0-6.4-0.8-8-6.4c0,0-4.4,16-3.2,23.2c0,0-9.6-5.6-11.6-2c0,0,9.2,9.6,4.4,18.4 c0,0-3.2,48.8,6.8,74c0,0,5.2,9.6,6.4,18c-0.4-9.6-0.8-29.6,2.4-33.6c0,0,14-24.4,3.6-46c0,0,2.4-32,38-17.2c0,0,6.8,1.6,14,2l0,0 l0,0l0,0l0,0c7.2-0.4,14-2,14-2C303.6,101.6,306,134,306,134c-10.4,21.6,3.6,46,3.6,46c3.2,4,2.8,24,2.4,33.6c1.2-8.4,6.4-18,6.4-18 c10.4-25.2,6.8-74,6.8-74C320.8,112.8,330,102.8,330,102.8z">
                  </path>
              </g>
          </svg>


this svg icon not showing add this for
each user`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

function createMailIcon() {
    const svgString = ` <svg width="11px" height="11px" viewBox="0 -3.5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>mail</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -261.000000)" fill="#898989"> <path d="M430,275.916 L426.684,273.167 L415.115,285.01 L444.591,285.01 L433.235,273.147 L430,275.916 L430,275.916 Z M434.89,271.89 L445.892,283.329 C445.955,283.107 446,282.877 446,282.634 L446,262.862 L434.89,271.89 L434.89,271.89 Z M414,262.816 L414,282.634 C414,282.877 414.045,283.107 414.108,283.329 L425.147,271.927 L414,262.816 L414,262.816 Z M445,261 L415,261 L430,273.019 L445,261 L445,261 Z" id="mail" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

function createtickIcon() {
    const svgString = `  <svg style=" margin-top: 8px; margin-right: 2px; margin-left: 3px " width="18px" height="18px"   viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>i</title>
                                <g id="Complete">
                                    <g id="tick">
                                        <polyline points="3.7 14.3 9.6 19 20.3 5" fill="none" stroke="#39dd36"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        </polyline>
                                    </g>
                                </g>
                            </g>
                        </svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

function createcrossIcon() {
    const svgString = `<svg style=" margin-top: 2px;"  width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#ee72aa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}
function createviewIcon() {
    const svgString = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3.5" stroke="#222222"></circle> <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#222222"></path> </g></svg>`;

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    return svgElement;
}

organizationData();


