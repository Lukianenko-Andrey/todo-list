// JavaScript code for the ToDo List application

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    if (!taskInput || !addTaskButton || !taskList) {
        console.error('Nichts gefunden.');
        return;
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    taskList.addEventListener('click', handleTaskClick);

    loadTasks(); // Загрузка задач при загрузке страницы

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Du hast nichts geschrieben.');
            return;
        }

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks(); // Сохранение задач
    }

    function handleTaskClick(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskItem = event.target.parentElement;
            taskList.removeChild(taskItem);
            saveTasks(); // Сохранение задач
        } else if (event.target.classList.contains('complete-btn')) {
            const taskItem = event.target.parentElement;
            taskItem.classList.toggle('completed');
            saveTasks(); // Сохранение задач
        }
    }

    function createTaskElement(taskText, isCompleted = false) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent;
            const isCompleted = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }
});