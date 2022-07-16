/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import image from '../../public/images/board-user.svg'
import styles from '../styles/styles.module.scss'
import {GetStaticProps} from 'next'
import firebase from '../services/firebaseConnection'
import { useState } from 'react'


type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}
interface HomeProps {
  data: string;
}

export default function Home ({data}: HomeProps) {

  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data))

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
          width={400}
          height={250}
        />

        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita </span>e online
          </p>
        </section>

        {donaters.length > 0 && (<h3>Apoiadores:</h3>)}

        <div className={styles.donaters}>
          {donaters.map((donate, index) => (
              <Image key={index} src={donate.image} alt='Usuário' width={60} height={60} objectFit="fill"/>  
          ))}
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const donaters = await firebase.firestore().collection('users').get();

  const data = JSON.stringify(donaters.docs.map(item => {
    return {
      id: item.id,
      ...item.data(),
    }
  }))

  return {
    props: {
      data
    },
    revalidate:  60 * 60 //atualiza a cada 60 minutos
  }
}
