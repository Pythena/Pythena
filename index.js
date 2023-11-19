// server.js
const express = require('express');
const app = express();
const fs = require('fs');
const handlebars = require('handlebars');
const port = 3000;

// In-memory store for tasks
const tasks = {};

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/faq', (req, res) => {
  res.sendFile(__dirname + '/public/faq.html');
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

app.post('/code/:bcode', (req, res) => {
  const bcode = req.params.bcode;
  const code = Buffer.from(bcode, 'base64').toString('ascii');


});

app.get('/task/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks[taskId];

  // Read the HTML template file
  const templatePath = __dirname + '/public/taskViewTemplate.html';
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading template file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Compile the template using Handlebars
    const compiledTemplate = handlebars.compile(template);

    // Replace placeholders in the template with actual task details
    const taskViewHTML = compiledTemplate({ task });

    // Respond with the HTML page containing the task details
    res.send(taskViewHTML);
  });
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Helper function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 8);
}
