import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useState } from 'react';
import Select, { ValueType } from 'react-select';
import Layout from '../../components/Layout';
import ReactSelect from '../../components/ReactSelect';
import UserMenuClient from '../../components/UserMenuClient';
import UserMenuTherapist from '../../components/UserMenuTherapist';
import VideoUploader2 from '../../components/VideoUploader2';
import { h2, normalText } from '../../styles/sharedStyles';
import {
  ApplicationError,
  RegionType,
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
  userId: number;
};

const pageContainer = css`
  display: flex;
  width: 100%;
  padding-top: 20px;
  align-items: center;
  flex-direction: column;
`;

const formContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 45vw;
  //background-color: orange;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  height: auto;
  margin-bottom: 20px;
`;

const videoContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 45vw;
  border-radius: 8px;
  border: 1px solid black;
  height: auto;
  margin-bottom: 20px;
  padding-top: 10px;
`;

const inputsContainer = css`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding-top: 10px;
  //background-color: green;

  label {
    font-size: ${normalText};
    margin: 10px;
    display: block;
    //background-color: purple;
    text-align: left;
    line-height: 1.5;
  }

  li {
    line-height: 1.5;
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
`;

const headingContainer = css`
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: 10px;

  > h2 {
    font-size: ${h2};
    text-align: center;
  }
`;

// const customStyles = {
//   option: (provided) => ({
//     ...provided,
//     padding: 5,
//     width: 300,
//     placeholder: 'Region...'
//   }),

//   return {...provided};
// };

const singleItemContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 80px;
  margin-left: 8px;
  margin-bottom: 10px;
`;

// const itemDropdown = css`
//   align-content: center;
// `;

const buttonWrapper = css`
  display: flex;
  justify-content: center;
`;

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

const errorStyles = css`
  color: red;
  height: 20px;
  text-align: center;
`;

const costWrapper = css`
  display: flex;
`;

const euroSignStyles = css`
  display: flex;
  align-items: center;
`;

const clientInfoStylesWrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;

const clientInfoStyles = css`
  display: flex;
  font-weight: bold;
  margin-bottom: 10px;
`;

const itemHeading = css`
  height: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  display: flex;
  //background-color: purple;
`;

const singleItemContainerSpecializations = css`
  display: flex;
  flex-direction: column;
  width: 100%
  height: 100px;
  margin-left: 8px;
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
          region: region?.label,
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
      <Layout email={props.email} userId={props.userId}>
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
      <Layout email={props.email} userId={props.userId}>
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
      <Layout email={props.email} userId={props.userId}>
        <UserMenuClient
          firstName={props.user.firstName}
          lastName={props.user.lastName}
          userId={props.userId}
        />
        <Head>
          <title>
            Profile page for {props.user.firstName} {props.user.lastName}
          </title>
        </Head>

        <div css={pageContainer}>
          <div css={formContainer}>
            <div css={inputsContainer}>
              <div css={headingContainer}>
                <h1 data-cy="profile-page-h1">Your profile</h1>
              </div>
              <div css={clientInfoStylesWrapper}>
                <div css={clientInfoStyles}>First name:</div>{' '}
                {props.user.firstName}
              </div>
              <div css={clientInfoStylesWrapper}>
                <div css={clientInfoStyles}>Last name:</div>
                {props.user.lastName}
              </div>
              <div css={clientInfoStylesWrapper}>
                <div css={clientInfoStyles}>Email:</div>
                {props.user.email}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout email={props.email} userId={props.userId}>
        <UserMenuTherapist
          firstName={props.user.firstName}
          lastName={props.user.lastName}
          userId={props.user.id}
        />
        <Head>
          <title>Therapist Profile page</title>
        </Head>
        <div css={pageContainer}>
          <div css={videoContainer}>
            <div css={inputsContainer}>
              <div css={headingContainer}>
                <h1 data-cy="profile-page-h1">Your video</h1>
              </div>
              <label htmlFor="video-url">
                Please upload a video in horizontal view (max. 60 seconds) where
                you answer the following 3 questions:
                <ol>
                  <li>Who are you and what are you specialized on?</li>
                  <li>
                    Describe a typical situation a client would come to you
                    with.
                  </li>
                  <li>Why do you love what you do?</li>
                </ol>
              </label>
              <VideoUploader2 videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
            </div>
          </div>
          <div css={formContainer}>
            <form onSubmit={formSubmitTherapist} id="form1">
              <div>
                <div css={inputsContainer}>
                  <div css={headingContainer}>
                    <h1 data-cy="profile-page-h1">Your information</h1>
                  </div>
                  <div>
                    <label htmlFor="company-name">
                      What is your company name?{' '}
                    </label>
                    <input
                      placeholder="e.g. Mindful zone"
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
                    <div css={costWrapper}>
                      <input
                        placeholder="100"
                        aria-label="cost-per-hour"
                        data-cy="cost-per-hour"
                        value={costPerHour}
                        onChange={(event) => {
                          setCostPerHour(event.currentTarget.value);
                        }}
                      />
                      <div css={euroSignStyles}>€</div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="street-name">
                      Please enter your address:
                    </label>
                    <input
                      placeholder="Testweg"
                      aria-label="street-name"
                      data-cy="street-name"
                      value={streetAddress}
                      onChange={(event) => {
                        setStreetAddress(event.currentTarget.value);
                      }}
                    />
                    <input
                      placeholder="14"
                      aria-label="street-number"
                      data-cy="street-number"
                      value={streetNumber}
                      onChange={(event) => {
                        setStreetNumber(event.currentTarget.value);
                      }}
                    />
                  </div>
                  <div css={singleItemContainer}>
                    <div css={itemHeading}>Region:</div>
                    <ReactSelect
                      options={regionOptions}
                      value={region}
                      onChange={(
                        selectedOption: ValueType<RegionType, false>,
                      ) => {
                        setRegion(selectedOption as RegionType);
                      }}
                    />
                  </div>
                  <div css={singleItemContainer}>
                    <div css={itemHeading}>ZIP Code:</div>
                    <ReactSelect
                      aria-label="zip-code"
                      options={zipCodeOptions}
                      value={zipCode}
                      onChange={(
                        selectedOption: ValueType<ZipCodeType, false>,
                      ) => {
                        setZipCode(selectedOption as ZipCodeType);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="website-url">
                      Please enter your website url:
                    </label>
                    <input
                      placeholder="https://www.exampletherapy.com"
                      aria-label="website-url"
                      data-cy="website-url"
                      value={websiteUrl}
                      onChange={(event) => {
                        setWebsiteUrl(event.currentTarget.value);
                      }}
                    />

                    <div css={singleItemContainerSpecializations}>
                      <label htmlFor="specializations">
                        Please choose up to 4 specializations:
                      </label>
                      <div>
                        <Select
                          onChange={(
                            selectedOption: ValueType<SpecializationType, true>,
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
                            return selectedSpecializations?.length ===
                              maxOptions
                              ? 'You cannot choose more than 4 specializations'
                              : 'No options available';
                          }}
                          value={selectedSpecializations}
                        />
                      </div>
                    </div>
                    <div css={buttonWrapper}>
                      <button css={coloredButtonStyles}>Save</button>
                    </div>
                    <div css={errorStyles}>{error}</div>
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
