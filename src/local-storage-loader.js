import { TodoData } from "./todo-data";

function saveData(todoData) {
  console.log("Saving data");
  document.activeElement.dispatchEvent(new Event("change"));
  localStorage.setItem("todo-data", JSON.stringify(todoData));
  console.log("Data saved");
}

function restoreData() {
  console.log("Restoring data");
  const json = localStorage.getItem("todo-data");
  let todoData;
  if (json) {
    todoData = TodoData.fromObject(
      JSON.parse(localStorage.getItem("todo-data")),
    );
  } else {
    todoData = new TodoData();
    todoData.addTaskList("Inbox");
  }
  console.log("Data restored");
  return todoData;
}

export { saveData, restoreData };
