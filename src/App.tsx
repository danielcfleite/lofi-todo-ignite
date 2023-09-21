import "./styles/global.css";
import { Header } from "./components/header";
import { Tasks } from "./components/Tasks";
import { useState } from "react";
import { nanoid } from "nanoid";

export interface ITask {
  id: any;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function addTask(taskTitle: string) {
    setTasks([
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
    setTasks(newTasks);
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
