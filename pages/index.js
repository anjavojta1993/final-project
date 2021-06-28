import { css } from '@emotion/react';
import Head from 'next/head';
// import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

const pageContainer = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

export default function Home() {
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
        <Layout>
          <Hero />
          {/* <Footer /> */}
        </Layout>
      </div>
    </>
  );
}
