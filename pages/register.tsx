import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { normalText } from '../styles/sharedStyles';
import { getValidSessionByToken } from '../util/database';

type Props = {
  refreshEmail: () => void;
  email: string;
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

const checkboxesContainer = css`
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 5px;
  margin-bottom: 20px;

  label {
    padding-left: 10px;
    font-size: ${normalText};
    width: 250px;
    line-height: 1.5;
  }
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

export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTherapist, setIsTherapist] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  return (
    <Layout email={props.email}>
      <Head>
        <title>Register</title>
      </Head>
      <div css={pageContainer}>
        <div css={formContainer}>
          <form
            onSubmit={async (event) => {
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
                }),
              });
              const { user: createdUser } = await response.json();

              // update Login/Logout button in header
              props.refreshEmail();

              // Navigate to the user's page when
              // they have been successfully created
              router.push(`/profiles/success`);
            }}
          >
            <div css={logoContainer}>
              <img
                src="/images/logo.png"
                alt="lotus flower with ease brand name"
              />
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
                <input
                  type="checkbox"
                  // State #2: Synchronize the value to the HTML
                  checked={isTherapist}
                  onChange={(event) => {
                    // State #3: Update the value
                    setIsTherapist(event.currentTarget.checked);
                  }}
                />
                <label htmlFor="therapist">I am a therapist</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  // State #2: Synchronize the value to the HTML
                  checked={isClient}
                  onChange={(event) => {
                    // State #3: Update the value
                    setIsClient(event.currentTarget.checked);
                  }}
                />
                <label htmlFor="client">I am looking for a therapist</label>
              </div>
            </div>
            <button css={coloredButtonStyles}>Sign up</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  // if (session) {
  //   Redirect the user when they have a session
  //   token by returning an object with the `redirect` prop
  //   https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  //   return {
  //     redirect: {
  //       destination: `/`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}
