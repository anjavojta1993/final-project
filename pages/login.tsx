import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import Logo from '../public/images/logo.png';
import { normalText } from '../styles/sharedStyles';
import { getValidSessionByToken } from '../util/database';
import { LoginResponse } from './api/login';

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

const formContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 25vw;
  //background-color: orange;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  height: 95%;
`;

const logoContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;

  > img {
    width: 200px;
  }
`;

const loginOrSignUpContainer = css`
  justify-content: center;
  display: flex;
  width: 250px;
  margin-right: 5px;
  margin-bottom: 10px;
`;

const inputsContainer = css`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 5px;
  margin-bottom: 10px;

  input {
    text-align: center;
    justify-content: center;
    padding: 5px;
    font-size: ${normalText};
    align-items: center;
    width: 250px;
    margin-bottom: 10px;
  }
`;

const buttonStyles = css`
  display: flex;
  justify-content: center;
  width: 50%;
  font-weight: 400;
  border: none;
  padding: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: lightgray;
  margin-right: 5px;
  margin-bottom: 10px;
  align-items: center;

  :hover {
    border: 1px solid black;
    cursor: pointer;
  }
`;

const coloredButtonStyles = css`
  background: linear-gradient(to left, #faffd1, #a1ffce);
  justify-content: center;
  font-weight: 800;
  border: none;
  width: 250px;
  padding: 20px 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: ${normalText};

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

const errorStyles = css`
  color: red;
  height: 20px;
  text-align: center;
`;

export default function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Login</title>
      </Head>

      <div css={pageContainer}>
        <div css={formContainer}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              // Send the email and password to the API
              // for verification
              const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
              });

              const json = (await response.json()) as LoginResponse;

              if ('errors' in json) {
                setError(json.errors[0].message);
                return;
              }

              props.refreshEmail();

              // Navigate to the user's page when
              // they have been successfully created
              router.push(`/profiles/${json.user.id}`);
            }}
          >
            <div css={logoContainer}>
              <Image src={Logo} alt="lotus flower with ease brand name" />
            </div>
            <div css={loginOrSignUpContainer}>
              <Link href="/register">
                <a css={buttonStyles}>Sign up</a>
              </Link>
              <Link href="/login">
                <a css={buttonStyles}>Login</a>
              </Link>
            </div>

            <div css={inputsContainer}>
              <div>
                <input
                  placeholder="email@example.com"
                  aria-label="email"
                  data-cy="register-email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </div>

              <div>
                <input
                  placeholder="password"
                  aria-label="password"
                  data-cy="register-password"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <button css={coloredButtonStyles}>Login</button>
            <div css={errorStyles}>{error}</div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (session) {
    // TODO: Update this to the actual page I want to redirect it to
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: `/profiles/${session.userId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
