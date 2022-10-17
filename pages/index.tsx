// index.tsx
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const Home: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.info('form data is', data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ReceitaClient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <input defaultValue="example@test.com" {...register('email')} />
          <br />
          <br />
          <input {...register('password')} />
          <br />
          {errors.password && errors.password?.message && <span>{errors.password.message}</span>}
          <br />
          <input type="submit" />
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
