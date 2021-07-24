import { css } from '@emotion/react';
import Link from 'next/link';
import { normalText } from '../styles/sharedStyles';

const navBarContainer = css`
  margin: 0;
  display: flex;
  height: 180vh;
  width: 200px;
  align-self: flex-start;
  flex-direction: column;
  //background-color: orange;
  border-right: 1px solid black;

  p {
    display: block;
    padding-top: 10px;
    text-align: center;
    font-size: ${normalText};
  }

  a {
    margin-top: 20%;
    display: flex;
    justify-content: center;
    font-size: ${normalText};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
`;

const profileImageContainer = css`
  display: flex;
  margin-top: 20%;
  //background-color: blue;
  height: 150px;

  > img {
    width: auto;
    height: auto;
  }
`;

export default function UserMenuClient(props) {
  return (
    <div css={navBarContainer}>
      <div css={profileImageContainer}>
        <img
          src="/images/avatar.png"
          alt="woman with dark skin and afro and happy face avatar"
        />
      </div>
      <p>
        Welcome, {props.firstName} {props.lastName}
      </p>
      <Link href={`/profiles/${props.userId}`}>
        <a>Profile</a>
      </Link>
      <Link href="/favorites">
        <a>Favorites</a>
      </Link>
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </div>
  );
}
