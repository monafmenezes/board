import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/images/logo.svg'
import { ButtonSignIn } from '../ButtonSignIn'

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <Image
            className={styles.headerImage}
            src={Logo}
            alt='Logo Meu Board'
            width={56}
            height={56}
          />
        </Link>

        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/board'>
            <a>Meu Board</a>
          </Link>
        </nav>

        <ButtonSignIn />
      </div>
    </header>
  )
}
