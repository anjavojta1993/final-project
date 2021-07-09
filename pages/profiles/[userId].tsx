import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { ValueType } from 'react-select/lib/types';
import Layout from '../../components/Layout';
import Specializations from '../../components/Specializations';
import VideoUploader from '../../components/VideoUploader';
import { normalText } from '../../styles/sharedStyles';
import {
  ApplicationError,
  Specialization,
  Therapist,
  User,
} from '../../util/types';
import { TherapistProfileResponse } from '../api/therapistprofile';

type Props = {
  user?: User;
  therapist?: Therapist;
  email: string;
  errors?: ApplicationError[];
  specializationName: string;
  specialization: OptionType[];
  userId: Number;
};

type OptionType = {
  value: number;
  label: string;
};

const pageContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const formContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 60vw;
  //background-color: orange;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  height: 95%;
`;

const inputsContainer = css`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-right: 5px;
  margin-bottom: 10px;
`;

const coloredButtonStyles = css`
  background: linear-gradient(to left, #faffd1, #a1ffce);
  font-size: ${normalText};
  justify-content: center;
  font-weight: 800;
  border: none;
  width: 250px;
  padding: 20px 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 8px;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

// define const for regions

const vienna = 'Vienna';
const burgenland = 'Burgenland';
const upperaustria = 'Upper Austria';
const loweraustria = 'Lower Austria';
const salzburg = 'Salzburg';
const tyrol = 'Tyrol';
const vorarlberg = 'Vorarlberg';
const carinthia = 'Carinthia';
const styria = 'Styria';

export default function SingleClientProfile(props: Props) {
  console.log('alle props', props);

  const maxOptions = 5;
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<object[]>();
  const [companyName, setCompanyName] = useState('');
  const [costPerHour, setCostPerHour] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [region, setRegion] = useState('Vienna');
  const [error, setError] = useState('');

  console.log('therapist choice of specializations', selectedSpecializations);

  const handleTypeSelect = (selectedOption: OptionType[]) => {
    setSelectedSpecializations(selectedOption);
    console.log('selected option', selectedOption);
  };

  const formSubmitTherapist = async (event: any) => {
    event.preventDefault();
    {
      const response = await fetch('/api/therapistprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: props.userId,
          companyName: companyName,
          costPerHour: costPerHour,
          websiteUrl: websiteUrl,
          videoUrl: videoUrl,
          region: region,
          zipCode: zipCode,
          streetAddress: streetAddress,
          streetNumber: streetNumber,
          specializations: selectedSpecializations?.map((spec) => spec.value),
        }),
      });
      const json = (await response.json()) as TherapistProfileResponse;

      if ('errors' in json) {
        setError(json.errors[0].message);
        return;
      }

      // Navigate to the successfull creation page when
      // therapist profile has been successfully created
      router.push(`/profiles/creation-successful`);
    }
  };

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

  if (!props.therapist) {
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
  } else {
    return (
      <Layout email={props.email}>
        <Head>
          <title>Therapist Profile page</title>
        </Head>
        <div css={pageContainer}>
          <div css={formContainer}>
            <form onSubmit={formSubmitTherapist}>
              <h1 data-cy="profile-page-h1">Therapist Profile Page</h1>

              <div>
                <div css={inputsContainer}>
                  <div>
                    <label htmlFor="company-name">
                      What is your company name?{' '}
                    </label>
                    <input
                      placeholder="e.g. Mindful zone, Dr. Antje Enzi"
                      aria-label="company-name"
                      data-cy="company-name"
                      value={companyName}
                      onChange={(event) => {
                        setCompanyName(event.currentTarget.value);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="cost-per-hour">
                      Please enter your average cost/hour for a session:
                    </label>
                    <input
                      placeholder="e.g. 100"
                      aria-label="cost-per-hour"
                      data-cy="cost-per-hour"
                      value={costPerHour}
                      onChange={(event) => {
                        setCostPerHour(event.currentTarget.value);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="street-name">
                      Please enter your address:
                    </label>
                    <input
                      placeholder="Street name e.g. Gartenweg"
                      aria-label="street-name"
                      data-cy="street-name"
                      value={streetAddress}
                      onChange={(event) => {
                        setStreetAddress(event.currentTarget.value);
                      }}
                    />
                    <input
                      placeholder="Street number e.g. 4"
                      aria-label="street-number"
                      data-cy="street-number"
                      value={streetNumber}
                      onChange={(event) => {
                        setStreetNumber(event.currentTarget.value);
                      }}
                    />
                  </div>
                  <input
                    placeholder="ZIP Code e.g 1010"
                    aria-label="zip-code"
                    data-cy="zip-code"
                    value={zipCode}
                    onChange={(event) => {
                      setZipCode(event.currentTarget.value);
                    }}
                  />
                </div>
                <select
                  id="region"
                  value={region}
                  onChange={(event) => {
                    setRegion(event.currentTarget.value);
                  }}
                >
                  <option value={vienna}>Vienna</option>
                  <option value={burgenland}>Burgenland</option>
                  <option value={loweraustria}>Lower Austria</option>
                  <option value={upperaustria}>Upper Austria</option>
                  <option value={styria}>Styria</option>
                  <option value={salzburg}>Salzburg</option>
                  <option value={vorarlberg}>Vorarlberg</option>
                  <option value={tyrol}>Tyrol</option>
                  <option value={carinthia}>Carinthia</option>
                </select>

                <div>
                  <label htmlFor="website-url">
                    Please enter your website url:
                  </label>
                  <input
                    placeholder="e.g. https://www.mindfultherapy.com"
                    aria-label="website-url"
                    data-cy="website-url"
                    value={websiteUrl}
                    onChange={(event) => {
                      setWebsiteUrl(event.currentTarget.value);
                    }}
                  />

                  <div>
                    <label htmlFor="video-url">
                      Please upload a video in horizontal view (max. 60 seconds)
                      where you answer the following 3 questions:
                      <ol>
                        <li>Who are you and what are you specialized on?</li>
                        <li>
                          Describe a typical situation a client would come to
                          you with.
                        </li>
                        <li>Why do you love what you do?</li>
                      </ol>
                    </label>
                    <VideoUploader
                      videoUrl={videoUrl}
                      setVideoUrl={setVideoUrl}
                    />
                  </div>

                  <div>
                    <label htmlFor="specializations">
                      Please choose up to 5 specializations:
                    </label>
                    <Select
                      onChange={(selectedOption: ValueType<OptionType>) =>
                        handleTypeSelect(selectedOption as OptionType[])
                      }
                      isMulti
                      options={
                        selectedSpecializations?.length === maxOptions
                          ? []
                          : props.specialization
                      }
                      noOptionsMessage={() => {
                        return selectedSpecializations?.length === maxOptions
                          ? 'You cannot choose more than 5 specializations'
                          : 'No options available';
                      }}
                      value={selectedSpecializations}
                    />
                  </div>
                  <button css={coloredButtonStyles}>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    getAllSpecializations,
    getUserById,
    getValidSessionByToken,
    getTherapistByUserId,
  } = await import('../../util/database');

  console.log('list of all specializations', getAllSpecializations);

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

  const therapist = await getTherapistByUserId(Number(context.query.userId));
  console.log('therapist awaiting', therapist);

  const user = await getUserById(Number(context.query.userId));

  const userId = context.query.userId;

  const specialization = await getAllSpecializations();
  console.log('specializations list', specialization);

  return {
    props: {
      user: user || null,
      userId: userId,
      therapist: therapist || null,
      specialization: specialization.map((spec) => {
        return {
          value: spec.id,
          label: spec.specializationName,
        };
      }),
    },
  };
}
