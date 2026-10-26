const EDIT_MODE_TEXT = "Edit";
const SAVE_MODE_TEXT = "Save";

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

function createTaskButtonWithImage(className, imgSrc, imgAlt) {
  const button = document.createElement("button");
  const img = document.createElement("img");

  button.type = "button";
  button.className = className;

  img.src = imgSrc;
  img.alt = imgAlt;

  button.appendChild(img);
  return button;
}

function createBaseTaskElements(taskString) {
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  checkBox.type = "checkbox";

  label.innerText = taskString;
  label.className = "task";

  editInput.type = "text";
  editInput.className = "task";

  editButton.type = "button";
  editButton.innerText = EDIT_MODE_TEXT;
  editButton.className = "edit";

  return { checkBox, label, editInput, editButton };
}

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");

  const { checkBox, label, editInput, editButton } =
    createBaseTaskElements(taskString);
  const deleteButton = createTaskButtonWithImage(
    "delete",
    "./remove.svg",
    "Remove image icon"
  );

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function handleAddTask() {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    return;
  }

  const listItem = createNewTaskElement(taskText);

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
    const trimmedValue = editInput.value.trim();
    label.innerText = trimmedValue || label.innerText;
    editButton.innerText = EDIT_MODE_TEXT;
  } else {
    editInput.value = label.innerText;
    editButton.innerText = SAVE_MODE_TEXT;
  }

  listItem.classList.toggle("editMode");
}

function handleDeleteTask(event) {
  const listItem = event.currentTarget.parentNode;
  const parentListItem = listItem.parentNode;

  parentListItem.removeChild(listItem);
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

for (const child of incompleteTaskHolder.children) {
  bindTaskEvents(child, handleTaskCompletion);
}

for (const child of completedTasksHolder.children) {
  bindTaskEvents(child, handleTaskIncomplete);
}
