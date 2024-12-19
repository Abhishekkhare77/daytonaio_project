console.log("This setting is running")
const isAdmin = localStorage.getItem('user_role') === "admin" ? true : false;
const userList = document.getElementById('userlist')
if (!isAdmin) {
    userList.classList.add("hidden");
}

const Templates = document.getElementById('Templates')
if(!isAdmin){
    Templates.classList.add("hidden")
}
