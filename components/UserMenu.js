import { css } from '@emotion/react';
import { normalText } from '../styles/sharedStyles';

const navBarContainer = css`
  margin: 0;
  display: flex;
  height: 100%;
  align-self: flex-start;
  flex-direction: row;
  justify-content: center;
  background-color: orange;
  border-right: 1px solid black;
`;

export default function UserMenu() {
  return <div css={navBarContainer}>TEST</div>;
}
