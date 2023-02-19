const list = document.querySelector(".list");
const input = document.querySelector(".input");
const form = document.querySelector(".form");
const empty = document.querySelector(".empty");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmpty();

form.addEventListener("submit", addTask);

list.addEventListener("click", deleteTask);

list.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();

  const taskText = input.value;

  if (taskText !== "") {
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);

    input.value = "";
    input.focus();

    checkEmpty();
  }
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentElement = event.target.closest(".item");

  const id = Number(parentElement.id);

  const index = tasks.findIndex((tasks) => tasks.id === id);

  tasks.splice(index, 1);

  parentElement.remove();

  saveToLocalStorage();

  checkEmpty();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentElement = event.target.closest(".item");

  const id = Number(parentElement.id);

  const task = tasks.find((task) => task.id === id);

	task.done = !task.done;

	saveToLocalStorage();

  const taskName = parentElement.querySelector(".task-name");
  taskName.classList.toggle("task-name--done");
}

function checkEmpty() {
  if (tasks.length === 0) {
    const emptyHTML = `<li id="empty" class="empty">
													<img src="./img/empty1.png" alt="Empty" class="image">
													<div class="empty-title">Empty</div>
												</li>`;
    list.insertAdjacentHTML("afterbegin", emptyHTML);
  } else {
    const emptyElement = document.querySelector(".empty");
    emptyElement ? emptyElement.remove() : null;
  }
}

function renderTask(task) {
  const cssClass = task.done ? "task-name task-name--done" : "task-name";

  const taskHTML = `<li id="${task.id}" class="item">
												<div class="li-container">
													<div class="${cssClass}">${task.text}</div>
													<div class="item__buttons">
														<button type="button" data-action="done" class="button">
															<img src="./img/tick.svg" alt="Done" width="18" height="18">
														</button>
														<button type="button" data-action="delete" class="button">
															<img src="./img/cross.svg" alt="Done" width="18" height="18">
														</button>
													</div>
												</div>
											</li>`;

  list.insertAdjacentHTML("beforeend", taskHTML);
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
