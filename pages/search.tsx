import Head from 'next/head';
import Layout from '../components/Layout';

type Props = {
  email: string;
};

export default function SuccessfulCreation(props: Props) {
  return (
    <Layout email={props.email}>
      <Head>
        <title>Find a therapist</title>
      </Head>
      <h1>What are you looking for?</h1>
    </Layout>
  );
}
