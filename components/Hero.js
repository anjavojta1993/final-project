import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from './Layout';

const pageContainer = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default function Hero() {
  return (
    <>
      <Head>abc</Head>
      <div css={pageContainer}></div>
    </>
  );
}
