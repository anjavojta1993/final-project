import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import UserMenuClient from '../../components/UserMenuClient';
import { h2 } from '../../styles/sharedStyles';
import { User } from '../../util/types';

type Props = {
  email: string;
  userId: number;
  user?: User;
};

const pageContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  > h1 {
    font-size: ${h2};
  }
`;

const allLogoContainer = css`
  display: flex;
  width: auto;
  //background-color: green;

  > a {
    text-decoration: none;
    color: black;

    :hover {
      font-weight: bold;
      color: black;
      cursor: pointer;
    }
  }
`;

const singleLogoContainer = css`
  display: flex;
  align-items: center;
  width: auto;
  margin-top: 50px;
  margin-right: 20px;
  //background-color: red;

  > a {
    text-decoration: none;
    color: black;

    :hover {
      font-weight: bold;
      color: black;
      cursor: pointer;
    }
  }
`;

export default function Favorites(props: Props) {
  return (
    <Layout email={props.email} userId={props.userId}>
      <UserMenuClient
        firstName={props.user?.firstName}
        lastName={props.user?.lastName}
        userId={props.userId}
      />
      <Head>
        <title>Favorites</title>
      </Head>
      <div css={pageContainer}>YOUR FAVORITES</div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getValidSessionByToken } = await import(
    '../../util/database'
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
