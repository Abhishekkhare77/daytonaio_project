  const countryOptions = [
  { value: 'India', label: 'India' },
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'China', label: 'China' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'France', label: 'France' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Austria', label: 'Austria' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Romania', label: 'Romania' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Czech Republic', label: 'Czech Republic' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Tanzania', label: 'Tanzania' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Côte d’Ivoire', label: 'Côte d’Ivoire' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
  { value: 'Finland', label: 'Finland' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'North Macedonia', label: 'North Macedonia' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Brunei', label: 'Brunei' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Laos', label: 'Laos' },
  { value: 'Myanmar (Burma)', label: 'Myanmar (Burma)' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Macao', label: 'Macao' },
  { value: 'North Korea', label: 'North Korea' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'New Caledonia', label: 'New Caledonia' },
  { value: 'French Polynesia', label: 'French Polynesia' },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'Kiribati', label: 'Kiribati' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Micronesia', label: 'Micronesia' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Palau', label: 'Palau' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cape Verde', label: 'Cape Verde' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Congo - Brazzaville', label: 'Congo - Brazzaville' },
  { value: 'Congo - Kinshasa', label: 'Congo - Kinshasa' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Eswatini', label: 'Eswatini' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'The Gambia', label: 'The Gambia' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'São Tomé & Príncipe', label: 'São Tomé & Príncipe' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Zambia', label: 'Zambia' },
  // Middle Eastern Countries
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Syria', label: 'Syria' },
  { value: 'Yemen', label: 'Yemen' },
  // Additional Countries for Completeness
  { value: 'Timor-Leste', label: 'Timor-Leste' },
  { value: 'Palestine', label: 'Palestine' },
  // Continuing and completing the countryOptions array
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Vatican City', label: 'Vatican City' },
  // Small Island Nations
  { value: 'American Samoa', label: 'American Samoa' },
  { value: 'Cook Islands', label: 'Cook Islands' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'U.S. Virgin Islands', label: 'U.S. Virgin Islands' },
  { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
  // Territories with Special Status
  { value: 'Hong Kong SAR China', label: 'Hong Kong SAR China' },
  { value: 'Macao SAR China', label: 'Macao SAR China' },
  { value: 'Faroe Islands', label: 'Faroe Islands' },
  { value: 'Greenland', label: 'Greenland' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Saint Barthélemy', label: 'Saint Barthélemy' },
  { value: 'Saint Martin', label: 'Saint Martin' },
  { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
  { value: 'Sint Maarten', label: 'Sint Maarten' },
  { value: 'French Guiana', label: 'French Guiana' },
  { value: 'Guadeloupe', label: 'Guadeloupe' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Mayotte', label: 'Mayotte' },
  // Additional territories and regions
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Bermuda', label: 'Bermuda' },
  { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
  { value: 'British Virgin Islands', label: 'British Virgin Islands' },
  { value: 'Cayman Islands', label: 'Cayman Islands' },
  { value: 'Falkland Islands', label: 'Falkland Islands' },
  { value: 'Gibraltar', label: 'Gibraltar' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Pitcairn Islands', label: 'Pitcairn Islands' },
  { value: 'Saint Helena', label: 'Saint Helena' },
  { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
  { value: 'Antarctica', label: 'Antarctica' }
]


//---------------------------------------------------
// console.log('running editOrg script ', countryOptions);


const user_id = localStorage.getItem('user_id')
// console.log(user_id)
const org_id = localStorage.getItem('org_id')
// console.log(org_id)

const orgSubmit = document.getElementById("org_submit");
const doneText = document.getElementById("done_text");
const spinnerContainer = document.getElementById("spinner_container");

if (orgSubmit) {
  orgSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    spinnerContainer.style.display = 'inline-block'; // Show the spinner
    doneText.style.display = 'none'; 
    handleupdate();
  });
} else {
  console.error('Element with id "login_submit" not found');
}

const countries = document.getElementById("edit_countries")

countryOptions.forEach(country => {
  // console.log('country', country)
  const option = document.createElement('option');
  option.value = country.value;
  option.textContent = country.label;
  countries.appendChild(option);
});

function handleupdate() {

  const orgName = document.getElementById("edit_org_Name").value;
  const orgUrl = document.getElementById("edit_org_url").value;
  const countries = document.getElementById("edit_countries").value;

  // const countries = document.getElementById('countries');


  const orgLogo = document.getElementById("edit_org_logo").value;

  // console.log('orgName:', orgName);
  // console.log('orgUrl:', orgUrl);
  // console.log('countries:', countries);
  // console.log('orgLogo:', orgLogo);

  const user_id = localStorage.getItem('user_id')
//  console.log(user_id)


  
  fetch(`https://team-org-backend.onrender.com/update-organization/${org_id}/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      org_name: orgName,
      org_website: orgUrl,
      org_country: countries,
      org_logo: orgLogo,
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
 
      window.location.href = "./organization.html";
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here, show error message
    }).finally(() => {
      spinnerContainer.style.display = 'none'; // Hide the spinner
      doneText.style.display = 'inline-block'; // Show the login text
    });
}





// const org_id = localStorage.getItem('org_id')
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
      console.log(item.name)

      const datalogo = item.org_logo;
      const editorgLogo = document.getElementById("edit_org_logo");
      editorgLogo.value = datalogo;

      const dataName = item.org_name;
      const editorgName = document.getElementById("edit_org_Name");
      editorgName.value = dataName;

      const datacountry = item.org_country;
      const editycountries = document.getElementById("edit_countries");
      editycountries.value = datacountry;

      const datawebsite = item.org_website;
      const editorgUrl = document.getElementById("edit_org_url");
      editorgUrl.value = datawebsite;



    }).catch(error => {
      console.error('Error:', error);
    });
}

organizationData();