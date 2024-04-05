let $ = document;
const userInput = $.querySelector("#itemInput");
let addBtn = $.querySelector("#addButton");
let clearBtn = $.querySelector("#clearButton");
let todoList = $.querySelector("#todoList");

let todoArray = [];

// -------------Add todo to list -------
addBtn.addEventListener("click", addNewTodo);

function addNewTodo() {
  let todoName = userInput.value;
  if (todoName.length > 0) {
    let newTodo = {
      id: todoArray.length + 1,
      subject: todoName,
      complete: false,
    };
    userInput.value = "";
    todoArray.push(newTodo);
    setLocalStorage(todoArray);
    todoGenerator(todoArray);

    userInput.focus();
  }
}

// -------------------------load data to localStorage-----------------

function setLocalStorage(todoList) {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

// -----------Generate Todo Table ---------------------------
function todoGenerator(todo) {
  todoList.innerHTML = "";
  todo.forEach((element) => {
    let newTodoStructure = $.createElement("li");
    newTodoStructure.classList.add("completed", "well");

    let newTodoSubject = $.createElement("label");
    newTodoSubject.innerHTML = element.subject;

    let newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.classList.add("btn", "btn-success");
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute(
      "onclick",
      "changeStatus(" + element.id + ")"
    );

    let newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.classList.add("btn", "btn-danger");
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute(
      "onclick",
      "deleteTodoBtn(" + element.id + ")"
    );

    if (element.complete) {
      newTodoSubject.className = "line";
      newTodoCompleteBtn.innerHTML = "UnComplete";
    }

    newTodoStructure.append(
      newTodoSubject,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    todoList.append(newTodoStructure);
    console.log(newTodoStructure);
  });
}

// -----------------------delete todo btn-------------------
function deleteTodoBtn(todoId) {
  let localStorageTodo = JSON.parse(localStorage.getItem("todo"));
  // console.log(localStorageTodo);
  todoArray = localStorageTodo;
  let mainDeleteTodo = todoArray.findIndex((todo) => {
    return todo.id === todoId;
  });
  todoArray.splice(mainDeleteTodo, 1);
  console.log(todoArray);
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
}

// ---------------changeStatus------------------------
function changeStatus(todoId) {
  let localStorageTodo = JSON.parse(localStorage.getItem("todo"));
  todoArray = localStorageTodo;

  todoArray.forEach((todo) => {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });

  setLocalStorage(todoArray);
  todoGenerator(todoArray);
  console.log(todoArray);
}

// -----------------Get data from localStorage----------------
window.addEventListener("load", getLocalStorage);
function getLocalStorage() {
  let localStorageTodo = JSON.parse(localStorage.getItem("todo"));

  if (localStorageTodo) {
    todoArray = localStorageTodo;
  } else {
    todoArray = [];
  }
  todoGenerator(todoArray);
}

// ------------------clear data from localhost and dom-------------------
clearBtn.addEventListener("click", clearAllTodo);
function clearAllTodo() {
  todoArray = [];
  todoGenerator(todoArray);
  localStorage.removeItem("todo");
}

userInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addNewTodo();
  }
});
