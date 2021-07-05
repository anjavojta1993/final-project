import Head from 'next/head';
import Layout from '../../components/Layout';

type Props = {
  email: string;
};

export default function SuccessfulCreation(props: Props) {
  return (
    <Layout email={props.email}>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Thank you, your profile page has been successfully created.</h1>
    </Layout>
  );
}
