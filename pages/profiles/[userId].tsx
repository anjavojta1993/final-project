import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useState } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import VideoUploader2 from '../../components/VideoUploader2';
import { normalText } from '../../styles/sharedStyles';
import {
  ApplicationError,
  RegionType,
  Specialization,
  SpecializationType,
  Therapist,
  User,
  ZipCodeType,
} from '../../util/types';
import { TherapistProfileResponse } from '../api/therapistprofile';

type Props = {
  user?: User;
  therapist?: Therapist;
  email: string;
  errors?: ApplicationError[];
  specializationName: string;
  specialization: SpecializationType[];
  userId: Number;
};

const pageContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
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
  width: 50vw;
  background-color: orange;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  height: 95%;
`;

const inputsContainer = css`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-right: 5px;
  margin-bottom: 10px;
  background-color: green;

  label {
    font-size: ${normalText};
    margin: 10px;
    display: block;
    background-color: purple;
    text-align: left;
  }

  input {
    margin: 10px;
    font-size: ${normalText};
    padding: 5px;
    display: block;
    text-align: left;
    border-radius: 5px;
    width: 300px;
  }

  h1 {
    padding: 10px;
  }
`;

// const customStyles = {
//   option: (provided) => ({
//     ...provided,
//     padding: 5,
//     width: 300,
//   }),
//   return { ...provided };

// };

const coloredButtonStyles = css`
  background: linear-gradient(to left, #faffd1, #a1ffce);
  font-size: ${normalText};
  text-align: center;
  font-weight: 800;
  border: none;
  width: 250px;
  padding: 20px 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 20px;
  border-radius: 8px;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

// define const for regions

const regionOptions = [
  { value: 'vienna', label: 'Vienna' },
  { value: 'burgenland', label: 'Burgenland' },
  { value: 'upperaustria', label: 'Upper Austria' },
  { value: 'loweraustria', label: 'Lower Austria' },
  { value: 'salzburg', label: 'Salzburg' },
  { value: 'tyrol', label: 'Tyrol' },
  { value: 'vorarlberg', label: 'Vorarlberg' },
  { value: 'carinthia', label: 'Carinthia' },
  { value: 'styria', label: 'Styria' },
];

// define const for ZIP codes

const zipCodeOptions = [
  { value: '1010', label: '1010' },
  { value: '1020', label: '1020' },
  { value: '1030', label: '1030' },
  { value: '1040', label: '1040' },
  { value: '1050', label: '1050' },
  { value: '1060', label: '1060' },
  { value: '1070', label: '1070' },
  { value: '1080', label: '1080' },
  { value: '1090', label: '1090' },
  { value: '1100', label: '1100' },
  { value: '1110', label: '1110' },
  { value: '1120', label: '1120' },
  { value: '1130', label: '1130' },
  { value: '1140', label: '1140' },
  { value: '1150', label: '1150' },
  { value: '1160', label: '1160' },
  { value: '1170', label: '1170' },
  { value: '1180', label: '1180' },
  { value: '1190', label: '1190' },
  { value: '1200', label: '1200' },
  { value: '1210', label: '1210' },
  { value: '1220', label: '1220' },
  { value: '1230', label: '1230' },
];

export default function SingleClientProfile(props: Props) {
  console.log('alle props', props);

  const maxOptions = 4;
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<SpecializationType[]>();
  const [companyName, setCompanyName] = useState('');
  const [costPerHour, setCostPerHour] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState<ZipCodeType>();
  const [region, setRegion] = useState<RegionType>();
  const [error, setError] = useState('');

  console.log('therapist choice of specializations', selectedSpecializations);

  console.log('chosen region', region);

  const handleTypeSelect = (selectedOption: SpecializationType[]) => {
    setSelectedSpecializations(selectedOption);
    console.log('selected option', selectedOption);
  };

  const formSubmitTherapist = async (event: any) => {
    const specializationIds = selectedSpecializations?.map(
      (spec) => spec.value,
    );
    console.log('show me if its right', specializationIds);
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
          region: region?.value,
          zipCode: zipCode?.value,
          streetAddress: streetAddress,
          streetNumber: streetNumber,
          specializationIds: selectedSpecializations?.map((spec) => spec.value),
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
        <UserMenu
          firstName={props.user.firstName}
          lastName={props.user.lastName}
          userId={props.userId}
        />
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
        <UserMenu
          firstName={props.user.firstName}
          lastName={props.user.lastName}
          userId={props.user.id}
        />
        <Head>
          <title>Therapist Profile page</title>
        </Head>
        <div css={pageContainer}>
          <div css={formContainer}>
            <div css={inputsContainer}>
              <div>
                <h1 data-cy="profile-page-h1">Your video</h1>
                <label htmlFor="video-url">
                  Please upload a video in horizontal view (max. 60 seconds)
                  where you answer the following 3 questions:
                  <ol>
                    <li>Who are you and what are you specialized on?</li>
                    <li>
                      Describe a typical situation a client would come to you
                      with.
                    </li>
                    <li>Why do you love what you do?</li>
                  </ol>
                </label>
              </div>
              <VideoUploader2 videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
            </div>
          </div>
          <div css={formContainer}>
            <form onSubmit={formSubmitTherapist} id="form1">
              <div>
                <div css={inputsContainer}>
                  <h1 data-cy="profile-page-h1">Your information</h1>
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
                  <Select
                    options={zipCodeOptions}
                    value={zipCode}
                    onChange={(event) => {
                      setZipCode(event);
                    }}
                  />

                  <Select
                    options={regionOptions}
                    value={region}
                    onChange={(event) => {
                      setRegion(event);
                    }}
                  />
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
                      <label htmlFor="specializations">
                        Please choose up to 5 specializations:
                      </label>
                      <Select
                        // styles={customStyles}
                        onChange={(
                          selectedOption: ValueType<SpecializationType>,
                        ) =>
                          handleTypeSelect(
                            selectedOption as SpecializationType[],
                          )
                        }
                        isMulti
                        options={
                          selectedSpecializations?.length === maxOptions
                            ? []
                            : props.specialization
                        }
                        noOptionsMessage={() => {
                          return selectedSpecializations?.length === maxOptions
                            ? 'You cannot choose more than 4 specializations'
                            : 'No options available';
                        }}
                        value={selectedSpecializations}
                      />
                    </div>
                    <button css={coloredButtonStyles}>Save</button>
                  </div>
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
