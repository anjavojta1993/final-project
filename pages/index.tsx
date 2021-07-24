import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

const pageContainer = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

type Props = {
  email: string;
};

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div
        css={pageContainer}
        style={{
          background: 'linear-gradient(to left, #FAFFD1, #A1FFCE)',
        }}
      >
        <Layout email={props.email} userId={props.userId}>
          <Hero />
          {/* <Footer /> */}
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getValidSessionByToken } = await import(
    '../util/database'
  );

  const session = await getValidSessionByToken(
    context.req.cookies.sessionToken,
  );

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(Number(context.query.userId));

  const userId = context.query.userId;

  return {
    props: {
      user: user || null,
      userId: userId,
    },
  };
}
