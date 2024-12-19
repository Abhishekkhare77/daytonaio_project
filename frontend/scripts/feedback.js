const user_id = localStorage.getItem('user_id')
// console.log(user_id)

const task_id = localStorage.getItem('selectedTaskId')
// console.log(task_id)

const feedbackSubmit = document.getElementById("feedback_submit");

if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    hendlefeedback();
  });
} else {
  console.error('Element with id "login_submit" not found');
}



function hendlefeedback() {

    const feedback = document.getElementById('feedback').value
    // console.log('feedback',feedback);
    

  
  
    fetch(`https://team-org-backend.onrender.com/done-task/${user_id}/${task_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        task_feedback: feedback
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      // console.log('Success:', data);
      window.location.href = "./popup.html";

    }).catch(error => {
      console.error('Error:', error);
    });
  
  }