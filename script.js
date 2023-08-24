const inputBox = document.querySelector("#todo-input");
const addToDoButton = document.querySelector(".todo-form");
const toDoList = document.querySelector("#todo-list");
// let todoList = [
//   { id: "1", text: "111", isDone: false },
//   { id: "2", text: "222", isDone: true },
// ];
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

addToDoButton.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputBox.value.trim() === "") {
    alert("Please enter a todo");
    return;
  }
  const todo = {
    id: crypto.randomUUID(),
    text: inputBox.value,
    isDone: false,
  };
  todoList.push(todo);
  // save to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  inputBox.value = "";
  render();
});

function deleteTodo(id) {
  const newTodo = todoList.filter((todo) => todo.id !== id);
  todoList = newTodo;
  // save to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

function toggleDone(id) {
  const newTodo = todoList.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: !todo.isDone };
    }
    return todo;
  });
  todoList = newTodo;
  // save to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

function generateTodoHtml(todo) {
  return /*html*/ `<li id=${todo.id} class="todo-list-item">
            <input onchange="toggleDone('${todo.id}')" type="checkbox" ${
    todo.isDone ? "checked" : ""
  } class="todo-checkbox" />
            <label style=${
              todo.isDone ? "text-decoration:line-through" : ""
            };>${todo.text}</label>
            <button onclick="deleteTodo('${todo.id}')">Delete</button>
          </li>`;
}

function render() {
  toDoList.innerHTML = "";
  todoList.forEach((todo) => {
    toDoList.innerHTML += generateTodoHtml(todo);
  });
}

render();
