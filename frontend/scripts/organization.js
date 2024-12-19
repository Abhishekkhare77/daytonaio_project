
console.log('running')

const isAdmin = localStorage.getItem('user_role')=== 'admin'? true : false;
const edti = document.getElementById('edit')
if (!isAdmin) {
  edti.classList.add("hidden");
}


const org_id = localStorage.getItem('org_id')
// console.log(org_id)

function organizationData() {
  fetch(`https://team-org-backend.onrender.com/get-organization/${org_id}`, {
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
      // console.log(item.name)

      const datalogo = item.org_logo;
      const orgLogo = document.getElementById('org_logo');
      orgLogo.src = datalogo;

      const dataName = item.org_name;
      const orgName = document.getElementById('org_name');
      orgName.textContent = dataName;

      const datacountry = item.org_country;
      const orgCountry = document.getElementById('org_country');
      orgCountry.textContent = datacountry;

      const datawebsite = item.org_website;
      const orgWebsite = document.getElementById('org_website');
      orgWebsite.textContent = datawebsite;

      const linkwebsite = item.org_website;
      const orgLink = document.getElementById('org_link');
      orgLink.href = linkwebsite;


    }).catch(error => {
      console.error('Error:', error);
    });
}

organizationData();