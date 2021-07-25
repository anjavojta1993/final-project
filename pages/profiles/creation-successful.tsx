import Head from 'next/head';
import Layout from '../../components/Layout';

type Props = {
  email: string;
  userId: number;
};

export default function SuccessfulCreation(props: Props) {
  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Thank you, your profile page has been successfully created.</h1>
    </Layout>
  );
}
