// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const listContainer = document.getElementById('taskList');

// Add event listeners
addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);
sortSelect.addEventListener('change', sortTasks);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    // Check if the due date is not empty and is not in the past
    if (taskText !== '' && isDueDateValid(dueDate)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-details">
                <span>${taskText}</span>
                <span class="due-date">Due: ${dueDate}</span>
            </div>
            <div class="task-actions">
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;

        const deleteBtn = li.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveData();
        });

        const editBtn = li.querySelector('.editBtn');
        editBtn.addEventListener('click', () => {
            editTask(li);
        });

        taskList.appendChild(li);
        taskInput.value = '';
        dueDateInput.value = '';

        saveData();
    }
}

// Function to check if a due date is valid (not in the past)
function isDueDateValid(dueDate) {
    if (!dueDate) {
        return false; // Empty due date is not valid
    }

    const currentDate = new Date();
    const inputDate = new Date(dueDate);

    // Compare the input date to the current date
    return inputDate >= currentDate;
}

// Function to edit a task
function editTask(taskElement) {
    const taskDetails = taskElement.querySelector('.task-details');
    const taskTextElement = taskDetails.querySelector('span');
    const taskText = taskTextElement.textContent;

    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null) {
        taskTextElement.textContent = newTaskText;
        saveData();
    }
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('taskList', listContainer.innerHTML);
}

// Function to show tasks from localStorage
function showTasks() {
    const savedData = localStorage.getItem('taskList');
    if (savedData) {
        listContainer.innerHTML = savedData;

        // Add event listeners for delete and edit buttons after loading saved tasks
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        const editBtns = document.querySelectorAll('.editBtn');

        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const taskItem = deleteBtn.closest('li');
                taskList.removeChild(taskItem);
                saveData();
            });
        });

        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', () => {
                const taskItem = editBtn.closest('li');
                editTask(taskItem);
            });
        });
    }
}

// Function to search tasks
function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const taskText = task.querySelector('.task-details span').textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Call the showTasks function to load saved tasks
showTasks();
