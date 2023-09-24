import "./styles/global.css";
import { Header } from "./components/header";
import { Tasks } from "./components/Tasks";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface ITask {
  id: any;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        title: taskTitle,
        id: nanoid(),
        isCompleted: false,
      },
    ]);
  }

  function taskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={taskCompletedById}
      />
    </>
  );
}

export default App;
