// server.js
const express = require('express');
const app = express();
const port = 3000;

// In-memory store for tasks
const tasks = {};

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint to create a task
app.post('/create-task', (req, res) => {
  const taskTitle = req.body.taskTitle;
  const taskDesc = req.body.taskDesc;
  const inp = req.body.inp;
  const ou = req.body.ou;

  // Generate a unique identifier for the task
  const taskId = generateId();

  // Store the task in memory
  tasks[taskId] = { taskTitle, taskDesc, inp, ou };

  // Respond with the generated short link
  const shortLink = `http://localhost:3000/task/${taskId}`;
  res.send(shortLink);
});

// API endpoint to get a task based on its ID
app.get('/task/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks[taskId];

  if (task) {
    res.send(`
<h2>Task: ${task.taskTitle}</h2>
<p>Description: ${task.taskDesc}</p>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">Input</th>
    <th class="tg-0lax">Output</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">dkfgjdfkgjdfkg</td>
    <td class="tg-0lax">dfkgjdkfjgkdfjgkjdfg</td>
  </tr>
</tbody>
<p>Input: ${task.inp}</p>
<p>Output: ${task.ou}</p>`);
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Helper function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 8);
}
