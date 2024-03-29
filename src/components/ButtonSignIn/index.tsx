/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from "next/image";

export const ButtonSignIn = () => {
  const [session] = useSession()


  return session ? (
    <button type="button" className={styles.ButtonSignIn} onClick={() => signOut()}>
      <div>
        <Image objectFit="fill" src={session.user.image} alt="Foto do usuário" width={35} height={35} />
      </div>
      Olá {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.ButtonSignIn}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#FFB800" />
      Entrar com github
    </button>
  );
};
