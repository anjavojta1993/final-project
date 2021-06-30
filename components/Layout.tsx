import { css } from '@emotion/react';
// import Footer from './Footer';
import Header from './Header';

const containerStyles = css`
  margin: 0;
`;

type Props = {
  children: React.ReactNode;
  email: string;
};

export default function Layout(props: Props) {
  return (
    <>
      <Header email={props.email} />
      <div css={containerStyles}>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
}
