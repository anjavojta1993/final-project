import { css } from '@emotion/react';
import Link from 'next/link';
import { normalText } from '../styles/sharedStyles';

const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100vw;
  font-size: ${normalText};
`;

const navBar = css`
  display: flex;
  align-self: center;
  margin-left: 8%;
  //position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  //font-weight: bold;
  //overflow: hidden;

  :first-of-type {
    margin-left: 30%;
  }

  :hover {
    cursor: pointer;
  }
`;

const logoContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;

  > img {
    margin-left: 10%;
    width: 200px;
  }
`;

const buttonStyles = css`
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  background-color: black;
  font-size: ${normalText};
  font-weight: 400;
  border: none;
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

export default function Header(props) {
  return (
    <header
      css={headerStyles}
      style={{
        background: 'linear-gradient(to left, #FAFFD1, #A1FFCE)',
      }}
    >
      <div css={logoContainer}>
        <img src="/images/logo.png" alt="lotus flower with ease brand name" />
      </div>
      <Link href="/">
        <a css={navBar}>Home</a>
      </Link>
      <Link href="/products">
        <a css={navBar}>How it works</a>
      </Link>
      <Link href="/contact">
        <a css={navBar}>Contact</a>
      </Link>
      {props.email ? (
        <Link href="/logout">
          <a css={buttonStyles}>Logout</a>
        </Link>
      ) : (
        <Link href="/register">
          <a css={buttonStyles}>Login</a>
        </Link>
      )}
    </header>
  );
}
