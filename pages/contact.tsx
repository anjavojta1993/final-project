import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/Layout';
import { h2 } from '../styles/sharedStyles';

type Props = {
  email: string;
  userId: number;
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

export default function Contact(props: Props) {
  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Contact</title>
      </Head>
      <div css={pageContainer}>
        <h1>Reach us on social media or contact us via email.</h1>
        <div css={allLogoContainer}>
          <div css={singleLogoContainer}>
            <Link href="https://www.example.com/ease">
              <a target="blank">
                {' '}
                <AiFillInstagram size={46} />
              </a>
            </Link>
          </div>
          <div css={singleLogoContainer}>
            <Link href="https://www.example.com/ease">
              <a target="blank">
                {' '}
                <AiFillFacebook size={46} />
              </a>
            </Link>
          </div>
          <div css={singleLogoContainer}>
            <Link href="mailto:anja.vojta@gmail.com">
              <a>
                {' '}
                <MdEmail size={46} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
