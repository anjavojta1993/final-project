import { css, Global } from '@emotion/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [email, setEmail] = useState();

  // Declare a function that we will use in any page or
  // component (via passing props) to refresh the
  // username (if it has gotten out of date)
  const refreshEmail =
    // useCallback: Prevent this function from getting
    // a different reference on every rerender
    //
    // We do this to prevent calls to the API on
    // every page navigation
    useCallback(async () => {
      // Call the API to retrieve the user information
      // by automatically passing along the sessionToken cookie
      const response = await fetch('/api/profile');
      const json = await response.json();

      // If there are errors, return early
      if ('errors' in json) {
        // TODO: Handle errors - show to the user
        return;
      }

      // Set the username state variable which we can use
      // in other components via passing props
      setEmail(json.user?.username);
    }, []);

  // Retrieve username information ONCE the first time
  // that a user loads the page
  useEffect(() => {
    refreshEmail();
  }, [refreshEmail]);

  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: 'Epilogue', sans-serif;
            color: black;
          }
        `}
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100;400;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} refreshEmail={refreshEmail} email={email} />
    </>
  );
}

export default MyApp;
