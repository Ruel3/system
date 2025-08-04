const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const deadline = document.getElementById('deadline').value;
  const subject = document.getElementById('subject').value;
  const priority = document.getElementById('priority').value;

  const task = {
    id: Date.now(),
    title,
    deadline,
    subject,
    priority
  };

  tasks.push(task);
  displayTasks();
  taskForm.reset();
});

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'task-info';
    info.innerHTML = `<strong>${task.title}</strong><br>
      📅 ${task.deadline} | 📘 ${task.subject} | ⚠️ ${task.priority}`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);

    checkReminder(task);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  document.getElementById('title').value = task.title;
  document.getElementById('deadline').value = task.deadline;
  document.getElementById('subject').value = task.subject;
  document.getElementById('priority').value = task.priority;
  deleteTask(id);
}

function checkReminder(task) {
  const now = new Date();
  const deadline = new Date(task.deadline);
  const timeDiff = deadline - now;

  if (timeDiff < 86400000 && timeDiff > 0) {
    alert(`⏰ Reminder: "${task.title}" is due within 24 hours!`);
  }
}
