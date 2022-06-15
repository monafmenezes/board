/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const ButtonSignIn = () => {
  const session = true

  return session ? (
    <button type='button' className={styles.ButtonSignIn} onClick={() => {}}>
        <img src="https://joeschmoe.io/api/v1/random" alt="Foto do usuário" />
        Olá Monalisa
        <FiX color='#737380' className={styles.closeIcon}/>
     
    </button>
  ) : (
    <button type='button' className={styles.ButtonSignIn} onClick={() => {}}>
      <FaGithub color='#FFB800' />
      Entrar com github
    </button>
  )
}
