import { css } from '@emotion/react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Layout from '../components/Layout';
import { largeText } from '../styles/sharedStyles';
import { deleteSessionByToken } from '../util/database';

type Props = {
  refreshEmail: () => void;
  email: string;
  userId: number;
};

const pageContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const logoutContainer = css`
  justify-content: center;
  font-size: ${largeText};
  font-weight: 200;
`;

export default function Logout(props: Props) {
  useEffect(() => props.refreshEmail(), [props]);

  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Logout</title>
      </Head>
      <div css={pageContainer}>
        <div css={logoutContainer} data-cy="logout-page-h1">
          You have been logged out successfully. Please come back soon.{' '}
          <FaHeart />
        </div>
      </div>
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
