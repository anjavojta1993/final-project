import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '../public/images/avatar.png';
import { normalText } from '../styles/sharedStyles';

const navBarContainer = css`
  margin: 0;
  display: flex;
  height: 180vh;
  width: 250px;
  align-self: flex-start;
  flex-direction: column;
  //background-color: orange;
  border-right: 1px solid black;
  align-items: center;

  p {
    display: block;
    padding-top: 10px;
    text-align: center;
    font-size: ${normalText};
    width: 200px;
  }

  a {
    margin-top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${normalText};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    color: black;
    font-weight: 500;
    //width: 100px;
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
      <Link href={`/profiles/${props.userId}/favorites`}>
        <a>Favorites</a>
      </Link>
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </div>
  );
}
