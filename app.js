const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function handleAddTask() {
  if (!taskInput.value) {
    return;
  }

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, handleTaskCompletion);

  taskInput.value = "";
}

function handleEditTask(event) {
  const listItem = event.currentTarget.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");

  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
}

function handleDeleteTask(event) {
  const listItem = event.currentTarget.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

function handleTaskCompletion(event) {
  const listItem = event.currentTarget.parentNode;

  completedTasksHolder.appendChild(listItem);

  bindTaskEvents(listItem, handleTaskIncomplete);
}

function handleTaskIncomplete(event) {
  const listItem = event.currentTarget.parentNode;

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, handleTaskCompletion);
}

addButton.addEventListener("click", handleAddTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = handleEditTask;
  deleteButton.onclick = handleDeleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], handleTaskCompletion);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], handleTaskIncomplete);
}
