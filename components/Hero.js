import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { h1, h2, normalText } from '../styles/sharedStyles';

const pageContainer = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

const heroImageContainer = css`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
  width: 45vw;
  height: 80vh;
  //background-color: orange;
  bottom: 0;

  > img {
    align-content: right;
  }
`;

const heroHeadingContainer = css`
  position: absolute;
  bottom: 25%;
  left: 10%;
  width: 800px;
  height: 350px;
  h1 {
    font-size: ${h1};
    line-height: 1.5em;
    font-weight: 600;
  }
  h2 {
    font-size: ${h2};
    line-height: 1.5em;
    letter-spacing: 1px;
    margin-bottom: 20px;
    font-weight: 300;
  }
`;

const heroButtonsContainer = css`
  position: absolute;
  bottom: 12%;
  left: 10%;
  width: 800px;
  height: auto;
`;

const buttonStylesDark = css`
  display: inline-block;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  background-color: black;
  font-size: ${normalText};
  font-weight: 400;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 40px;
  letter-spacing: 2px;
  text-transform: uppercase;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const buttonStylesLight = css`
  display: inline-block;
  color: black;
  background-color: none;
  font-size: ${normalText};
  font-weight: 400;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 40px;
  letter-spacing: 2px;
  text-transform: uppercase;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

export default function Hero() {
  return (
    <>
      <Head>abc</Head>
      <div css={pageContainer}>
        <div css={heroImageContainer}>
          <img
            src="/images/woman_meditating.png"
            alt="woman with dark skin and big afro sitting before forest meditating"
          />
        </div>
        <div css={heroHeadingContainer}>
          <h1>Struggling to find a good psychotherapist?</h1>
          <h2>
            Find experts for your concern. Get <br /> an impression with 60
            second videos.
            <br /> No unnecessary text.
          </h2>
        </div>
        <div css={heroButtonsContainer}>
          <Link href="/search/">
            <a css={buttonStylesLight}>Search therapist</a>
          </Link>
          <Link href="/register/">
            <a css={buttonStylesDark}>Sign up</a>
          </Link>
        </div>
      </div>
    </>
  );
}
