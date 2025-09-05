let todoList = [];
let currentFilter = 'all';

function validateInput() {
    const todoInput= document.getElementById('new-todo').value;
    const todoDateInput = document.getElementById('due-date').value;

    if (todoInput === ''|| todoDateInput === '') {
        alert('Please fill in both fields.');
    }else{
        addTodoItem(todoInput, todoDateInput);
    }
}

function addTodoItem(todo, dueDate) {
    const todoItem = {
        task: todo, 
        dueDate: dueDate,
        completed: false
    };
    todoList.push(todoItem);
    renderTodoList();
}

function deleteAll() {
    todoList =  [];
    renderTodoList();
}

function filterTodoItem(filter) {
    currentFilter = filter;
    renderTodoList();
}
function renderTodoList() {
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';

    let filteredList = todoList.filter(item => {
        if (currentFilter === "completed") return item.completed;
        if (currentFilter === "pending") return !item.completed;
        return true; // "all"
    });

    if (filteredList.length === 0) {
        todoListContainer.innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-400">
                    No task found
                </td>
            </tr>
        `;
        return;
    }

    filteredList.forEach((item) => {
        const originalIndex = todoList.indexOf(item); // ambil index asli
        todoListContainer.innerHTML += `
            <tr class="border-t border-gray-600">
                <td class="px-6 py-3">${item.task}</td>
                <td class="px-6 py-3">${item.dueDate}</td>
                <td class="px-6 py-3">${item.completed ? "Done" : "Pending"}</td>
                <td class="px-6 py-3">
                    <button onclick="toggleStatus(${originalIndex})" 
                        class="bg-green-500 text-white px-2 py-1 rounded">
                        ${item.completed ? "Undo" : "Complete"}
                    </button>
                    <button onclick="deleteTodo(${originalIndex})" 
                        class="bg-red-500 text-white px-2 py-1 rounded ml-2">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
function toggleStatus(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}
function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

