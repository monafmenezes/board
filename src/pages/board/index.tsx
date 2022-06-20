import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import styles from './styles.module.scss'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton'
import firebase from '../../services/firebaseConnection'

interface IUser {
  user: {
    name: string
    id: string
  }
}

const Board = ({ user }: IUser) => {
  const [input, setInput] = useState('')

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
        console.log('Cadastrado com sucesso')
      })
      .catch(err => console.log('Erro: ' + err))
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

        <h1>Você tem 2 tarefas</h1>

        <section>
          <article className={styles.taskList}>
            <p>
              Aprender criar projetos usando Next JS e aplicando firebase como
              back.
            </p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color='#ffbb00' />
                  <time>16 de junho de 2022</time>
                </div>

                <button>
                  <FiEdit2 size={20} color='#fff' />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color='#ff3636' />
                <span>Excluir</span>
              </button>
            </div>
          </article>
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
  const session = await getSession({ req });

  if(!session?.id){
    //Se o user nao tiver logado vamos redirecionar.
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    name: session?.user.name,
    id: session?.id
  }


  return{
    props:{
      user
    }
  }

}
