/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import image from '../../public/images/board-user.svg'
import styles from '../styles/styles.module.scss'
import {GetStaticProps} from 'next'
import {} from 'next'

export default function Home () {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>

      <main className={styles.contentContainer}>
        <Image
          className={styles.imageBoard}
          src={image}
          alt=''
          width={500}
          height={300}
        />

        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita </span>e online
          </p>
        </section>

        <div className={styles.donaters}>
          <img src='https://joeschmoe.io/api/v1/random' alt='usuario 1' />
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {

    },
    revalidate:  60 * 60 //atualiza a cada 60 minutos
  }
}
