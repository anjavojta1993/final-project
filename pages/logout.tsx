import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { deleteSessionByToken } from '../util/database';

type Props = {
  refreshEmail: () => void;
  email: string;
  userId: number;
};

export default function Logout(props: Props) {
  useEffect(() => props.refreshEmail(), [props]);

  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Logout</title>
      </Head>

      <div data-cy="logout-page-h1">You have been logged out successfully!</div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }
  // Note: if you want to redirect the user when they have no session
  // token, you could return an object with the `redirect` prop
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

  // Instruct the browser to delete the cookie
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('sessionToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
