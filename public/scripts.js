// public/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form');
  const shortLinkElement = document.getElementById('short-link');
  const shortLinkA = document.getElementById('shortlinka');

  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-description').value;
    const inp = document.getElementById('tes1i').value;
    const ou = document.getElementById('tes1o').value;
    // Send a POST request to create a task
    const response = await fetch('/create-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ taskTitle, taskDesc, inp, ou }),
    });

    if (response.ok) {
      // Display the short link to the user
      const shortLink = await response.text();
      shortLinkElement.textContent = `Short Link:`;
      shortLinkA.href = shortLink;
      shortLinkA.textContent = shortLink;
      shortLinkA.style = "color: ghostwhite;"
    } else {
      console.error('Failed to create task');
    }

    // Clear the input field
    document.getElementById('task-title').value = '';
  });
});
