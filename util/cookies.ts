import { serialize } from 'cookie';
import cookies from 'js-cookie';

export function createSerializedSessionTokenCookie(token: string) {
  const maxAge = 60 * 60 * 24; //24 hours

  const isProduction = process.env.NODE_ENV === 'production';
  // TODO: Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)

  return serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
