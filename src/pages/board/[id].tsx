import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import firebase from '../../services/firebaseConnection'
import { format} from 'date-fns'

type Task = {
  id: string
  created: string | Date
  createdFormated?: string
  tarefa: string
  userId: string
  nome: string
}

interface TaskListProps {
  data: string
}

const Task = ({data}: TaskListProps) => {

  const task = JSON.parse(data) as Task

  return (
    <div>
      <h1>Página detalhes</h1>
      <h2>{task.tarefa}</h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const { id } = params
  const session = await getSession({ req })

  if (!session?.id) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  const data = await firebase
    .firestore()
    .collection('tarefas')
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        created: snapshot.data().created,
        creatadeFormater: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        nome: snapshot.data().nome
      }

      return JSON.stringify(data)
    })

  return {
    props: {
      data
    }
  }
}

export default Task
