import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();

  // Declare a function that we will use in any page or
  // component (via passing props) to refresh the
  // username (if it has gotten out of date)
  const refreshEmailAndId =
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
      setEmail(json.user?.email);
      setUserId(json.user?.id);
    }, []);

  // Retrieve username information ONCE the first time
  // that a user loads the page
  useEffect(() => {
    refreshEmailAndId();
  }, [refreshEmailAndId]);

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
      <Head />
      <Component
        {...pageProps}
        refreshEmail={refreshEmailAndId}
        email={email}
        userId={userId}
      />
    </>
  );
}

export default MyApp;
