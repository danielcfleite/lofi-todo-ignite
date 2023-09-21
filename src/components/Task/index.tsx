import styles from "./task.module.css";
import Trash from "../../assets/trash.svg";
import { ITask } from "../../App";
import Checked from "../../assets/checked.svg";
import unChecked from "../../assets/unChecked.svg";

interface props {
  task: ITask;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Task({ task, onDelete, onComplete }: props) {
  return (
    <>
      <div className={styles.task}>
        <button
          className={styles.checkContainer}
          onClick={() => onComplete(task.id)}
        >
          <img src={task.isCompleted ? Checked : unChecked} />
        </button>

        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>

        <button className={styles.delete} onClick={() => onDelete(task.id)}>
          <img src={Trash} />
        </button>
      </div>
    </>
  );
}
