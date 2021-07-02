import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { ApplicationError, User } from '../../util/types';

type Props = {
  user?: User;
  email: string;
  errors?: ApplicationError[];
};

export default function SingleClientProfile(props: Props) {
  // Show message if user not allowed
  const errors = props.errors;
  if (errors) {
    return (
      <Layout email={props.email}>
        <Head>
          <title>Error</title>
        </Head>
        Error: {errors[0].message}
      </Layout>
    );
  }

  // Show message if user does not exist
  if (!props.user) {
    return (
      <Layout email={props.email}>
        <Head>
          <title>User not found!</title>
        </Head>
        User not found
      </Layout>
    );
  }

  if (props.user.role === 'client') {
    console.log('role of client', props.user);
    return (
      <Layout email={props.email}>
        <Head>
          <title>
            Client Profile page for {props.user.firstName} {props.user.lastName}
          </title>
        </Head>

        <h1 data-cy="profile-page-h1">Client Profile Page</h1>

        <div>
          id: <span data-cy="profile-page-id">{props.user.id}</span>
        </div>

        <div>
          email: <span data-cy="profile-page-id">{props.user.email}</span>
        </div>
        <div>first_name: {props.user.firstName}</div>
        <div>last_name: {props.user.lastName}</div>
      </Layout>
    );
  } else if (props.user.role === 'therapist') {
    return (
      <Layout email={props.email}>
        <Head>
          <title>
            Therapist Profile page for {props.user.firstName}{' '}
            {props.user.lastName}
          </title>
        </Head>

        <h1 data-cy="profile-page-h1">Therapist Profile Page</h1>

        <div>
          id: <span data-cy="profile-page-id">{props.user.id}</span>
        </div>

        <div>
          email: <span data-cy="profile-page-id">{props.user.email}</span>
        </div>
        <div>first_name: {props.user.firstName}</div>
        <div>last_name: {props.user.lastName}</div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getValidSessionByToken } = await import(
    '../../util/database'
  );

  const session = await getValidSessionByToken(
    context.req.cookies.sessionToken,
  );

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(Number(context.query.userId));
  return { props: { user: user } };
}
