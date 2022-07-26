import { FiCheck } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi'
import styles from './task.module.css'

type Props = {
  task: {
    id: string
    content: string
    done: boolean
  }
  onComplete: (task: string) => void
  onDelete: (task: string) => void
}

export default function Task({ task, onComplete, onDelete }: Props) {
  return (
    <div className={styles.task} key={task.id}>
      <button className={styles.check} onClick={() => onComplete(task.id)}>
        {task.done ? (
          <div className={styles.checkboxComplete}>
            <FiCheck size={14} color="#FFF" />
          </div>
        ) : (
          <div className={styles.checkbox} />
        )}
      </button>
      <p className={task.done ? styles.isDone : ''}>{task.content}</p>
      <button className={styles.delete} onClick={() => onDelete(task.id)}>
        <HiOutlineTrash size={20} color="#808080" />
      </button>
    </div>
  )
}
