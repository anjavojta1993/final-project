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
import { generateCsrfSecretByToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { RegisterResponse } from './api/register';

type Props = {
  refreshEmail: () => void;
  email: string;
  csrfToken: string;
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
  align-items: center;
  width: 200px;
  text-align: center;
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

const checkboxesContainer = css`
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 5px;
  margin-bottom: 20px;

  label {
    font-size: ${normalText};
    width: 250px;
    line-height: 1.5;
  }
`;

const optionStyles = css`
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const buttonStyles = css`
  display: flex;
  font-size: ${normalText};
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
  font-size: ${normalText};
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

const therapist = 'therapist';
const client = 'client';

export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(client);
  const [error, setError] = useState('');
  const router = useRouter();

  const formSubmit = async (event: any) => {
    event.preventDefault();
    if (role === 'client') {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          csrfToken: props.csrfToken,
          role: client,
        }),
      });
      const json = (await response.json()) as RegisterResponse;

      if ('errors' in json) {
        setError(json.errors[0].message);
        return;
      }

      // update Login/Logout button in header
      props.refreshEmail();

      // Navigate to the user's page when
      // they have been successfully created
      router.push(`/profiles/${json.user.id}`);
    } else {
      event.preventDefault();

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          csrfToken: props.csrfToken,
          role: therapist,
        }),
      });
      const json = (await response.json()) as RegisterResponse;

      if ('errors' in json) {
        setError(json.errors[0].message);
        return;
      }

      // update Login/Logout button in header
      props.refreshEmail();

      // Navigate to the user's page when
      // they have been successfully created
      router.push(`/profiles/${json.user.id}`);
    }
  };

  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Register</title>
      </Head>
      <div css={pageContainer}>
        <div css={formContainer}>
          <form onSubmit={formSubmit}>
            <div css={logoContainer}>
              <div>
                <Image src={Logo} alt="lotus flower with ease brand name" />
              </div>
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

              <div>
                <input
                  placeholder="First name"
                  aria-label="first-name"
                  data-cy="register-first-name"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                  }}
                />
              </div>

              <div>
                <input
                  placeholder="Last name"
                  aria-label="last-name"
                  data-cy="register-last-name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.currentTarget.value);
                  }}
                />
              </div>
            </div>

            <div css={checkboxesContainer}>
              {' '}
              <div>
                <label>
                  Please choose:
                  <select
                    css={optionStyles}
                    id="role"
                    value={role}
                    onChange={(event) => {
                      setRole(event.currentTarget.value);
                    }}
                  >
                    <option value={client}>I am looking for a therapist</option>
                    <option value={therapist}>I am a therapist</option>
                  </select>
                </label>
              </div>
              <button css={coloredButtonStyles}>Sign up</button>
              <div css={errorStyles}>{error}</div>
            </div>
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
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // eslint-disable-next-line unicorn/prefer-node-protocol
  const crypto = await import('crypto');
  const { createSerializedRegisterSessionTokenCookie } = await import(
    '../util/cookies'
  );
  const { insertFiveMinuteSessionWithoutUserId, deleteExpiredSessions } =
    await import('../util/database');

  // Import and initialize the `csrf` library
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Tokens = await (await import('csrf')).default;
  const tokens = new Tokens();

  // Get session information if user is already logged in

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);
  console.log('session', session);

  await deleteExpiredSessions();

  // Generate 5-minute short-lived session, only for the registration
  const shortLivedSession = await insertFiveMinuteSessionWithoutUserId(
    crypto.randomBytes(64).toString('base64'),
  );

  // Set new cookie for the short-lived session
  const cookie = createSerializedRegisterSessionTokenCookie(
    shortLivedSession.token,
  );
  context.res.setHeader('Set-Cookie', cookie);

  // Use token from short-lived session to generate
  // secret for the CSRF token
  const csrfSecret = generateCsrfSecretByToken(shortLivedSession.token);

  // Create CSRF token
  const csrfToken = tokens.create(csrfSecret);

  return {
    props: {
      // Pass CSRF Token via props
      csrfToken,
    },
  };
}
