let inputElement = document.querySelector("input");
let container = document.getElementById("container");
let searchInput = document.getElementById("searchInput");

let todoArray = JSON.parse(localStorage.getItem("Todos")) || [];
Getdetails = () => {
  if (inputElement.value === "") {
    alert("Please Enter the task");
  } else {
    const repeatedTask = todoArray.some(
      (item) => item.task.toLowerCase() === inputElement.value.toLowerCase()
    );
    if (repeatedTask) {
      alert("Task already Exits");
    } else {
      let todoobj = {
        id: Math.random(),
        task: inputElement.value,
        isCompleted: false,
        isEditing: false,
      };
      todoArray.push(todoobj);
      localStorage.setItem("Todos", JSON.stringify(todoArray));

      inputElement.value = "";
      displayTodo(todoArray);
    }
  }
};
//striking task
strikeTask = (id) => {
  todoArray = todoArray.map((items) =>
    items.id == id ? { ...items, isCompleted: !items.isCompleted } : items
  );
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  displayTodo(todoArray);
};

//editig task
editTask = (id, originalTask) => {
  console.log(id, originalTask);
  todoArray = todoArray.map((items) =>
    items.id == id
      ? { ...items, isEditing: !items.isEditing, task: originalTask }
      : items
  );
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  displayTodo(todoArray);
};
//saving task after editing
updateTaskValue = (id, newtask) => {
  todoArray = todoArray.map((items) =>
    items.id == id ? { ...items, task: newtask, isEditing: false } : items
  );
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  displayTodo(todoArray);
};

//deleting task
deleteTask = (id) => {
  todoArray = todoArray.filter((items) => items.id != id);
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  displayTodo(todoArray);
};
revertTaskValue = (id, originalTask) => {
  todoArray = todoArray.map((items) =>
    items.id == id ? { ...items, isEditing: false, task: originalTask } : items
  );
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  displayTodo(todoArray);
};

//handilling key events
keyPress = (event, id, originalTask) => {
  if (event.key === "Enter") {
    const updatedTask = event.target.value;
    updateTaskValue(id, updatedTask);
  } else if (event.key === "Escape") {
    revertTaskValue(id, originalTask);
  }
};

// searchTask function
searhTask = (event) => {
  if (event.key === "Enter") {
    searchTodo();
  }
};

//searchingTask using search btn
searchTodo = () => {
  todoArray = todoArray.filter(
    (items) => items.task.toLowerCase() == searchInput.value.toLowerCase()
  );
  displayTodo(todoArray);
};

searchTodobychange = (event) => {
  console.log(event.target.value);
};
//searching task by typing
/* searchTodobychange = () => {
  const searchQuery = searchInput.value.toLowerCase().trim();

  const todoArray = todoArray.filter((item) =>
    item.task.toLowerCase().includes(searchQuery)
  );

  displayTodo(todoArray);

  if (filteredTodos.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No tasks found.</p>";
  }
}; */
/* 
------------------------------------------------------------------ */
//The below funtion is to display todo array over webpage
displayTodo = (todolist) => {
  container.innerHTML = "";
  todolist.map((items) => {
    container.innerHTML += `
    <div
  class="flex items-center justify-between bg-white shadow-md p-4 rounded-lg w-3/4"
>
  <!-- Checkbox -->
  <div class="flex items-center space-x-3">
    <input
      type="checkbox"
      onchange="strikeTask(${items.id})"
      ${items.isCompleted ? "checked" : ""}
      class="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      
    />
    ${
      items.isEditing
        ? `<input 
         type="text" 
         value="${items.task}" 
         class="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        onblur="updateTaskValue(${items.id}, this.value)"
onkeydown="keyPress(event, ${items.id}, '${items.task}')"

       />`
        : ` <p ondblclick="editTask(${items.id}, '${
            items.task
          }')" class="text-gray-800 ${
            items.isCompleted ? "line-through" : ""
          }">${items.task}</p>`
    }
   
  </div>
  <!-- Buttons -->
  <div class="space-x-4">
 
    <!-- Edit Button -->
    <button class="transition transform hover:scale-110 hover:rotate-12"  onclick="editTask(${
      items.id
    }, '${items.task}')">
      <i class="fas fa-edit text-indigo-500 text-lg hover:text-indigo-700"></i>
    </button>

    <!-- Delete Button -->
    <button class="transition transform hover:scale-110 hover:-rotate-12" onclick=deleteTask(${
      items.id
    })>
      <i class="fas fa-trash-alt text-red-500 text-lg hover:text-red-700"></i>
    </button>
  </div>
</div>`;
  });
};

displayTodo(todoArray);
