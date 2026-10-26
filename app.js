const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
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
};

const handleAddTask = function () {
  if (!taskInput.value) {
    return;
  }

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, handleTaskCompletion);

  taskInput.value = "";
};

const handleEditTask = function () {
  const listItem = this.parentNode;

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
};

const handleDeleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const handleTaskCompletion = function () {
  const listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, handleTaskCompletion);
};

addButton.onclick = handleAddTask;
addButton.addEventListener("click", handleAddTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = handleEditTask;
  deleteButton.onclick = handleDeleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], handleTaskCompletion);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
