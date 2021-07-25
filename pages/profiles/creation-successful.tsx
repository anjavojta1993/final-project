import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { largeText } from '../../styles/sharedStyles';

type Props = {
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

const loginContainer = css`
  justify-content: center;

  h2 {
    font-size: ${largeText};
    font-weight: 200;
  }
`;

export default function SuccessfulCreation(props: Props) {
  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Login</title>
      </Head>
      <div css={pageContainer}>
        <div css={loginContainer}>
          <h2>Thank you, your profile page has been successfully created.</h2>
        </div>
      </div>
    </Layout>
  );
}
