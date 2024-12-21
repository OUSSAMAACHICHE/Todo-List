// Get dom elements 
let input = document.getElementById("input"),
  btn = document.getElementById("btn"),
  container = document.querySelector(".container");

const log = console.log;
// Create an array contain the tasks that inside the localStorage if found
const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
// call the funicton to display tasks on the page••
displayTasksOnPage(tasksArray);

// trigger addTasks function
btn.addEventListener("click", (ev) => {
  if (input.value) {
    addTasksToArray(tasksArray);
    input.value = "";
  }
});
// handle Enter key
input.addEventListener('keydown', (ev) => {
  if(ev.key == 'Enter') {
    // check if there is a value 
    if(input.value) {
      addTasksToArray(tasksArray) // call the function to add task
      input.value = '' // empty the input 
    }

  }
})
// add to task to array function
function addTasksToArray(tasksArray) {
  // create task object
  const task = {
    taskText: input.value,
    taskId: Date.now(),
  };

  // add the task object to the array
  tasksArray.push(task);

  saveData(tasksArray);
  displayTasksOnPage(tasksArray);
}

function displayTasksOnPage(tasks) {
  container.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.prepend(document.createTextNode(task.taskText));

    // create delete button
    const btnsWrapper = document.createElement("div");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerText = "X";

    // create update button
    const updateBtn = document.createElement("button");
    updateBtn.className = "update";
    updateBtn.innerText = "Edit";

    // add update button to wrapper
    btnsWrapper.appendChild(updateBtn);

    // add delete btn to wrapper
    btnsWrapper.appendChild(deleteBtn);

    // add btnsWrapper to taskDiv
    taskDiv.appendChild(btnsWrapper);

    // add the taskDiv to the container
    container.appendChild(taskDiv);

    deleteTask(index, deleteBtn);
    updateTasks(index, updateBtn);
  });
}

function deleteTask(indexTask, deleteBtn) {
  // add click event
  deleteBtn.addEventListener("click", (e) => {
    // remove the task based on it's index
    tasksArray.splice(indexTask, 1);
    // re-render the displayTasksOnPage
    displayTasksOnPage(tasksArray);
    // re-render save data function
    saveData(tasksArray);
    // empty the input
    input.value = "";
  });
}

// Save data
function saveData(tasksArray) {
  if (tasksArray.length > 0) {
    // Save tasks to local storage only if there are tasks in the array
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  } else {
    // Clear the local storage if the array is empty
    localStorage.removeItem("tasks");
  }
}


// update data
function updateTasks(indexTask, updateBtn) {
  updateBtn.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("update")) {
      // change button text
      ev.target.innerText = "Save";
      // change the classname
      ev.target.classList.remove("update");
      ev.target.classList.add("save");

      // put the taskText to the input
      input.value = tasksArray[indexTask].taskText;
      // make the cursor focus on input
      input.focus();
    } else {
      // change button text
      ev.target.innerText = "Edit";
      // change the classname
      ev.target.classList.remove("save");
      ev.target.classList.add("update");

      // put the taskText to the input
      tasksArray[indexTask].taskText = input.value;

      saveData(tasksArray);
      displayTasksOnPage(tasksArray);

      // empty the input
      input.value = "";
    }
  });
}
