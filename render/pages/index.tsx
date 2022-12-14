import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ cats }: { cats: Cat[] }) => {
  console.log("----render cats", cats, typeof cats);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          家里的猫
        </h1>

        <p className={styles.description}>
          data from mongo
        </p>

        <div className={styles.grid}>
          {cats.map(cat => {
            return (
              <a key={cat.name} href="https://nextjs.org/docs" className={styles.card}>
                <h2>名字:{cat.name}</h2>
                <p>年龄:{cat.age}</p>
                <p>品种:{cat.breed}</p>
              </a>)
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  const response = await global.serverFetch('http://127.0.0.1/api/cats');
  return {
    props: { cats: response.json() }, // will be passed to the page component as props
  }
}

interface Cat {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
