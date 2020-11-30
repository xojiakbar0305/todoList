// ARRAYS
var todosArray = JSON.parse(localStorage.getItem('todos')) || [];

var id = Number(localStorage.getItem('counter'));

var elTodoForm = $_('.todos-form');
var elTodoList = $_('.todo-list');
var elTodoTemplate = $_('#todo-item').content;
var elTodoInput = $_('.todo-input', elTodoForm);
var elTodosLeft = $_('.todo-left');
var elFilterTodos = $_('.todos-footer');

//
var addTodo = (todoText) => {
  todosArray.push({
    title: todoText,
    completed: false,
    id: ++id,
  });
};
//clone template
var elCreateNewTodo = (array) => {

  var newTodo = elTodoTemplate.cloneNode(true);
  // debugger
  $_('.todo-checkbox-input', newTodo).checked = array.completed;
  $_('.todo-text', newTodo).textContent = array.title;
  $_('.todo-checkbox-input', newTodo).dataset.id = array.id;
  $_('.remove-todo-list-button', newTodo).dataset.id = array.id;

  if (array.completed) {
    $_('.todo-item', newTodo).classList.toggle('del');
  }

  return newTodo;
};

//local update
var updateStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todosArray));
  localStorage.setItem('counter', id);
};

//render
var renderTodo = (todo) => {

  elTodoList.innerHTML = '';
  
  var elFragment = document.createDocumentFragment();

 todo.forEach((array) => {
   elFragment.appendChild(elCreateNewTodo(array));
 });

  elTodoList.appendChild(elFragment);
};

renderTodo(todosArray);


//form submit
elTodoForm.addEventListener('submit', evt => {

  evt.preventDefault();

  var todoText = elTodoInput.value.trim();

  if (elTodoInput.value === '') {
    return;
  }
  
  console.log(todosArray)

  addTodo(todoText);
  renderTodo(todosArray);
  updateStorage();
  elTodosLeft.textContent = todosArray.length;
  
  elTodoInput.value = '';
  elTodoInput.focus();
});

elTodosLeft.textContent = todosArray.length;

elTodoList.addEventListener('click', (evt) => {
  //remove todo list
  if (evt.target.matches('.remove-todo-list-button')) {

    var indexBtn = evt.target.dataset.id;  

    var indexWork = todosArray.findIndex(function (work) {

      return String(indexBtn) === String(work.id);

    });

    todosArray.splice(indexWork, 1);
  
    renderTodo(todosArray);
    updateStorage();
    elTodosLeft.textContent = todosArray.length;
  } else if (evt.target.matches('.todo-checkbox-input')) {

    var taskCompletedId = evt.target.dataset.id;

    var taskCompleted = todosArray.find(task => {
      return String(task.id) === String(taskCompletedId);
    });

    taskCompleted.completed = !taskCompleted.completed

    renderTodo(todosArray)
    updateStorage();
  };

});

//filter todo
elFilterTodos.addEventListener('click', (evt) => {
  if (evt.target.matches('.show-all')) {
    renderTodo(todosArray);
  } else if (evt.target.matches('.show-active')) {
    var activesArray = todosArray.filter(task => {
      return !task.completed;
    });
    renderTodo(activesArray);
  } else if (evt.target.matches('.show-completed')) {
    var completedsArray = todosArray.filter(task => {
      return task.completed;
    })
    renderTodo(completedsArray);
  } else if (evt.target.matches('.clear-btn')) {
    localStorage.clear();
    todosArray = [];
    elTodoList.innerHTML = '';
    elTodosLeft.textContent = todosArray.length;
    updateStorage();
  }
});

elTodosLeft.textContent = todosArray.length;
updateStorage();