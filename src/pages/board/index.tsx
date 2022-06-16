import Head from "next/head";
import styles from "./styles.module.scss";
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton";

const Board = () => {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>

      <main className={styles.container}>
        <form>
          <input type="text" placeholder="Digite sua tarefa..." />
          <button>
            <FiPlus size={25} color="#17181e" />
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
                  <FiCalendar size={20} color="#ffbb00" />
                  <time>16 de junho de 2022</time>
                </div>

                <button>
                  <FiEdit2 size={20} color="#fff" />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#ff3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoioar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#fff" />
          <time>Útima doação foi a 3 dias</time>
        </div>
      </div>
      <SupportButton />
    </>
  );
};

export default Board;
