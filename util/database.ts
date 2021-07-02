import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import { Session, Therapist, User, UserWithPasswordHash } from './types';

// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// insertUser function
// query nr 1

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  role: string,
) {
  const users = await sql<[User]>`
    INSERT INTO users
      (first_name, last_name, email, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${email}, ${passwordHash})
    RETURNING
      id,
      first_name,
      last_name,
      email
  `;

  console.log(users);
  console.log(users[0]);
  console.log(users[0].id);

  // if therapist is true or false do second insert into therapist
  // ID IS already here, just work with the id

  if (role === 'therapist') {
    // keep everything between backticks clean bcs its sql, do it before or after then you can use JS
    const therapist = await sql<[User]>`
    INSERT INTO therapists
    -- this is the name of the column
      (user_id)
    VALUES
      (${users[0].id})
      RETURNING
      id
  `;

    console.log(therapist);
  }

  return users.map((user) => camelcaseKeys(user))[0];
}

// function to get user by email

export async function getUserWithPasswordHashByEmail(email?: string) {
  // Return undefined if email is falsy
  if (!email) return undefined;

  const users = await sql<[UserWithPasswordHash]>`
    SELECT
      *
    FROM
      users
    WHERE
      email= ${email}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function deleteUserById(id?: number) {
  if (!id) return undefined;

  const users = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      id,
      first_name,
      last_name,
      email
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function updateUserById(
  userId: number | undefined,
  firstName: string,
  lastName: string,
) {
  if (!userId) return undefined;

  const users = await sql<[User]>`
    UPDATE
      users
    SET
      first_name = ${firstName},
      last_name = ${lastName}
    WHERE
      id = ${userId}
    RETURNING
      id,
      first_name,
      last_name,
      email
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}
export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

// validate the session by token to use for constant login of user until session token has expired

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const sessions = await sql<Session[]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry > NOW()
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

// Perform a first query
export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      email
    FROM
      users
  `;
  return users.map((user) => camelcaseKeys(user));
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;

  return await getUserById(session.userId);
}

export async function getUserById(id?: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      first_name,
      last_name,
      email

    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getTherapistByUserId(id?: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const therapists = await sql<[Therapist]>`
    SELECT
 *
    FROM
      therapists
    WHERE
      user_id = ${id}
  `;
  console.log(therapists);
  return therapists.map((therapist) => camelcaseKeys(therapist))[0];
}

export async function insertFiveMinuteSessionWithoutUserId(token: string) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}
