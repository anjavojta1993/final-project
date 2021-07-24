import { css } from '@emotion/react';
import Header from './Header';

const containerStyles = css`
  margin: 0;
  display: flex;
`;

type Props = {
  children: React.ReactNode;
  email: string;
  userId: number;
};

export default function Layout(props: Props) {
  return (
    <>
      <Header email={props.email} userId={props.userId} />
      <div css={containerStyles}>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
}
