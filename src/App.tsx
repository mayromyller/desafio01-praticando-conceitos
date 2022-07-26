import { FormEvent, useState } from 'react'

import { IoClipboardOutline } from 'react-icons/io5'
import { FiPlusCircle } from 'react-icons/fi'

import Task from './components/Task/'

import LogoSVG from './assets/logo.svg'

type Tasks = {
  id: string
  content: string
  done: boolean
}

function App() {
  const [taskValue, setTaskValue] = useState('')
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: crypto.randomUUID(),
      content: 'Essa é uma nova task',
      done: false
    },
    {
      id: crypto.randomUUID(),
      content: 'Fazer as compras',
      done: true
    }
  ])

  const countTaskComplete = tasks.filter((task) => task.done).length

  function addNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: crypto.randomUUID(),
      content: taskValue,
      done: false
    }

    setTasks([...tasks, newTask])
    setTaskValue('')
  }

  function deleteTask(taskId: string) {
    const updateTask = tasks.filter((task) => task.id !== taskId)
    setTasks(updateTask)
  }

  function completeTask(taskId: string) {
    const checkTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task
    })

    setTasks(checkTask)
  }

  return (
    <div>
      <header className="header">
        <img src={LogoSVG} alt="Logo do App com um foguete e o nome todo" />
      </header>

      <main className="wrapper">
        <form className="form" onSubmit={addNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            className="input"
            onChange={(text) => setTaskValue(text.target.value)}
            value={taskValue}
          />
          <button className="button">
            Criar
            <FiPlusCircle size={20} />
          </button>
        </form>

        <div className="content">
          <div className="align">
            <p className="tagCreate">
              Tarefas criadas
              <span className="tagCount">{tasks.length}</span>
            </p>

            <p className="tagDone">
              Concluídas
              <span className="tagCount">
                {countTaskComplete} de {tasks.length}
              </span>
            </p>
          </div>
        </div>

        <div className="tasks">
          {tasks.map((task) => (
            <Task task={task} onComplete={completeTask} onDelete={deleteTask} />
          ))}

          {tasks.length < 1 && (
            <div className="emptyTask">
              <IoClipboardOutline size={56} color="#808080" />

              <div>
                <p className="info">Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
