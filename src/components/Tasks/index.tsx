import { Task } from "../Task";
import { ITask } from "../../App";
import styles from "./tasks.module.css";
import Clipboard from "../../assets/clipboard.svg";

interface props {
  tasks: ITask[];
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  isEnglish: boolean;
}

export function Tasks({ tasks, onDelete, onComplete, isEnglish }: props) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p>{isEnglish ? "Tasks" : "Tarefas criadas"}</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.purple}>
            {isEnglish ? "Completed" : "Concluídas"}
          </p>
          <span>
            {completedTasks}/{tasksQuantity}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}

        {tasks.length <= 0 && (
          <section className={styles.empty}>
            <img src={Clipboard} alt="" />
            <div>
              <p>
                {isEnglish
                  ? "You don't seem to have any tasks :("
                  : "Você ainda não tem tarefas cadastradas"}
              </p>
              <span>
                {isEnglish
                  ? "Create and organize tasks"
                  : "Crie tarefas e organize seus itens a fazer"}
              </span>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
