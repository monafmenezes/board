import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import styles from './styles.module.scss'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton'
import firebase from '../../services/firebaseConnection'
import { format } from 'date-fns'
import Link from 'next/link'

type TaskList = {
  id: string
  created: string | Date
  createdFormated?: string
  tarefa: string
  userId: string
  name: string
}

interface IUser {
  user: {
    name: string
    id: string
  }
  data: string
}

const Board = ({ user, data }: IUser) => {
  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data))
  const hadleAddTask = async (e: FormEvent) => {
    e.preventDefault()

    if (input === '') {
      alert('preencha alguma tarefa')
      return
    }

    await firebase
      .firestore()
      .collection('tarefas')
      .add({
        created: new Date(),
        tarefa: input,
        userId: user.id,
        name: user.name
      })
      .then(doc => {
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          tarefa: input,
          userId: user.id,
          name: user.name
        }

        setTaskList([...taskList, data])
        setInput('')
      })
      .catch(err => console.log('Erro: ' + err))
  }

  const handleDelete = async (id: string) => {
    await firebase
      .firestore()
      .collection('tarefas')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Deletado com sucesso')
        let deleted = taskList.filter(item => {
          return (item.id !== id)
        })

        setTaskList(deleted)
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <form onSubmit={hadleAddTask}>
          <input
            type='text'
            placeholder='Digite sua tarefa...'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button>
            <FiPlus size={25} color='#17181e' />
          </button>
        </form>

        <h1>
          Você tem {taskList.length}{' '}
          {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}!
        </h1>

        <section>
          {taskList.map(task => (
            <article key={task.id} className={styles.taskList}>
              <Link href={`/task/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color='#ffbb00' />
                    <time>{task.createdFormated}</time>
                  </div>

                  <button>
                    <FiEdit2 size={20} color='#fff' />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color='#ff3636' />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoioar esse projeto.</h3>
        <div>
          <FiClock size={28} color='#fff' />
          <time>Útima doação foi a 3 dias</time>
        </div>
      </div>
      <SupportButton />
    </>
  )
}

export default Board

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.id) {
    //Se o user nao tiver logado vamos redirecionar.
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const tasks = await firebase
    .firestore()
    .collection('tarefas')
    .where('userId', '==', session?.id)
    .orderBy('created', 'asc')
    .get()

  const data = JSON.stringify(
    tasks.docs.map(item => {
      return {
        id: item.id,
        createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy'),
        ...item.data()
      }
    })
  )

  const user = {
    name: session?.user.name,
    id: session?.id
  }

  return {
    props: {
      user,
      data
    }
  }
}
