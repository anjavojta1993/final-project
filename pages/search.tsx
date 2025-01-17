import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { AiOutlineEuro } from 'react-icons/ai';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import Select, { ValueType } from 'react-select';
import Layout from '../components/Layout';
import {
  h1,
  h2,
  largeText,
  mediumText,
  normalText,
} from '../styles/sharedStyles';
import {
  FilteredTherapists,
  FilteredTherapistsSpecNames,
  FilteredTherapistsWithScore,
  RegionType,
  SpecializationType,
  Therapist,
  ZipCodeType,
} from '../util/types';

type Props = {
  email: string;
  specialization: SpecializationType[];
  therapists: Therapist[];
  userId: number;
};

const pageContainer = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 90vh;
  //background-color: green;
  flex-direction: column;
`;

// here start the css styles for the search (top page)

const searchContainer = css`
  display: flex;
  flex-direction: column;
  //background-color: green;
`;

const resultsContainer = css`
  display: flex;
  //background-color: orange;
  flex-direction: column;
  border-top: 1px solid black;
`;

const imageContainer = css`
  //position: absolute;
  //background-color: blue;
  text-align: right;
  margin-left: auto;
  margin-right: 0;

  width: 1000px;
  /* left: 50%;
  transform: translateX(-50%); */

  > img {
    width: 65%;
    height: auto;
    margin-right: 0;
    //background-color: orange;
  }
`;

const searchHeadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  //background-color: orange;

  h2 {
    font-size: ${h2};
    line-height: 1.5em;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
  }
`;

const resultsHeadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  //background-color: orange;

  h1 {
    font-size: ${h1};
    line-height: 1.5em;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
  }

  h2 {
    font-size: ${largeText};
  }
`;

const searchItemsContainer = css`
  display: flex;
  flex-direction: row;
  //background-color: green;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const singleItemContainerSpecializations = css`
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 100px;
`;

const singleItemContainer = css`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  flex-direction: column;
  width: 200px;
  height: 100px;
`;

const itemHeading = css`
  font-size: ${normalText};
  height: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  //background-color: purple;
`;

const itemDropdown = css`
  align-content: center;
`;

const buttonStylesDark = css`
  display: inline-block;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  background-color: black;
  font-size: ${normalText};
  font-weight: 400;
  border: none;
  border-radius: 8px;
  padding: 16px 40px;
  letter-spacing: 2px;
  text-transform: uppercase;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

// here start the css styles for the results (bottom page)

const singleTherapistContainer = css`
  display: flex;
  width: 80vw;
  height: 350px;
  justify-content: center;
  align-self: center;
  //background-color: green;
  margin-bottom: 20px;
`;

const therapistContainer = css`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 90%;
  height: 350px;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  border-radius: 5px;
  border: 1px solid black;
  padding: 20px;
  //background-color: orange;
  margin-right: 20px;
`;

const leftInfoContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  //background-color: yellow;
  height: 300px;
`;

const therapistNameContainer = css`
  display: flex;
  align-items: center;
  width: auto;
  height: 20%;
  font-size: ${largeText};
  font-weight: bold;
  //background-color: purple;
`;

const videoContainer = css`
  display: flex;
  width: auto;
  height: 80%;
`;

const rightInfoContainer = css`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 300px;
`;

const headingContainer = css`
  display: flex;
  width: auto;
  height: 20%;
  align-items: center;
  font-size: ${largeText};
  font-weight: bold;
  //background-color: red;
`;

const headlineContainer = css`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  //background-color: blue;
`;

const favoritesContainer = css`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
  //background-color: yellow;
`;

const otherInfosContainer = css`
  display: flex;
  width: auto;
  height: 13%;
  //background-color: green;
`;

const iconContainer = css`
  display: flex;
  align-items: center;
  width: 10%;
  height: 100%;
  //background-color: red;
`;

const specializationsContainer = css`
  display: flex;
  width: auto;
  height: 41%;
  //background-color: purple;
  flex-wrap: wrap;
`;

const addressContainer = css`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  font-size: ${mediumText};
  //background-color: yellow;
`;

const priceContainer = css`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  font-size: ${mediumText};
`;

const websiteContainer = css`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  font-size: ${mediumText};

  > a {
    text-decoration: none;
    color: black;

    :hover {
      color: black;
      cursor: pointer;
    }
  }
`;

const matchingPercentageContainer = css`
  display: flex;
  width: 10%;
  height: 300px;
  justify-content: center;
  align-items: center;
  align-self: center;
  //background-color: blue;
`;

const matchingPercentageBox = css`
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
  align-items: center;
  font-size: ${h2};
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  background: linear-gradient(to left, #faffd1, #a1ffce);
`;

const coloredButtonStyles = css`
  background: linear-gradient(to left, #faffd1, #a1ffce);
  justify-content: center;
  font-weight: 600;
  border: 1px solid black;
  width: auto;
  height: 40px;
  display: inline-block;
  padding: 10px 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: ${normalText};
  display: inline-flex;
`;

const errorStyles = css`
  color: red;
  text-align: center;
`;

// define const for zipCodes

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

// this is the start of the function Component

export default function SearchForTherapist(props: Props) {
  // define variables for filtered therapists, that all match region AND zipcode AND at least one of the chosen specializations

  const [filteredTherapists, setFilteredTherapists] = useState<
    FilteredTherapists[]
  >([]);

  const [
    filteredTherapistsWithSpecializations,
    setFilteredTherapistsWithSpecializations,
  ] = useState<FilteredTherapistsSpecNames[]>([]);
  // define variable for final therapist scoreboard

  const [filteredTherapistsWithScore, setFilteredTherapistsWithScore] =
    useState<FilteredTherapistsWithScore[]>([]);

  const [loading, setLoading] = useState(false);

  // const [alreadyCounted, setAlreadyCounted] = useState([]);

  // functions to return final therapist info for frontend

  const therapistProps = props.therapists;

  const specializationProps = props.specialization;

  console.log('specialization props', props.specialization);

  // final therapist info WITHOUT specializations

  const finalTherapists = filteredTherapistsWithScore.map(
    (ther: FilteredTherapistsWithScore) => {
      console.log(therapistProps);
      const copyFinalTherapists = therapistProps.find(
        (therapist: Therapist) => therapist.id === ther.id,
      );
      return {
        id: copyFinalTherapists?.id,
        companyName: copyFinalTherapists?.companyName,
        costPerHour: copyFinalTherapists?.costPerHour,
        websiteUrl: copyFinalTherapists?.websiteUrl,
        videoUrl: copyFinalTherapists?.videoUrl,
        region: copyFinalTherapists?.region,
        zipCode: copyFinalTherapists?.zipCode,
        addressStreet: copyFinalTherapists?.addressStreet,
        addressNumber: copyFinalTherapists?.addressNumber,
        score: ther.score,
      };
    },
  );

  // const specWithNamesPerTherapist = filteredTherapists.map((ther) => {
  //   if (ther.specializationId === props.specialization.value) {
  //     return {
  //       ...ther,
  //       specializationName: props.specialization.label,
  //     };
  //   }
  // });

  // console.log('spec names', specWithNamesPerTherapist);

  console.log(
    'therapists with spec name',
    filteredTherapistsWithSpecializations,
  );

  // filteredTherapists.map((ther: FilteredTherapists) => {
  //   if (ther.therapistId === filteredTherapists.id) {
  //     specIdsOfFilteredTherapists.push();
  //   }
  // });

  console.log('final therapists', finalTherapists);

  // define variables needed for specialization dropdown
  const maxOptions = 4;

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SpecializationType[]
  >([]);

  console.log('client choice of specializations', selectedSpecializations);

  const handleTypeSelect = (selectedOption: SpecializationType[]) => {
    setSelectedSpecializations(selectedOption);
    console.log('selected option', selectedOption);
  };

  // these are objects

  const [region, setRegion] = useState<RegionType>();
  const [zipCode, setZipCode] = useState<ZipCodeType>();

  console.log('chosen region', region);
  console.log('chosen zip code', zipCode);
  console.log('selected client spec', selectedSpecializations);

  // define variable and functions for the smooth scrolling on submit of form

  const divRef = useRef<HTMLDivElement>(null);
  const executeScroll = () =>
    divRef.current?.scrollIntoView({ behavior: 'smooth' });

  const [error, setError] = useState('');

  // function to send information to API
  const formSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientRegion: region?.label,
        clientZipCode: zipCode?.value,
        clientSpecializationsIds: selectedSpecializations.map(
          (spec) => spec.value,
        ),
      }),
    });

    const data = await response.json();
    const dataFilteredTherapists = data.filteredTherapistsSpecializations;
    console.log('data', data);
    console.log('data filtered', data.filteredTherapistsSpecializations);
    console.log('filtered therapists', dataFilteredTherapists);

    const filteredTherapistsWithScoreCopy = [...filteredTherapistsWithScore];

    for (const ther of dataFilteredTherapists) {
      console.log('data in loop', dataFilteredTherapists);
      const alreadyCounted = filteredTherapistsWithScoreCopy.map(
        (therapist) => therapist.id,
      );
      if (alreadyCounted.includes(ther.therapistId)) {
        filteredTherapistsWithScoreCopy[
          alreadyCounted.indexOf(ther.therapistId)
        ].score += 1;
      } else {
        filteredTherapistsWithScoreCopy.push({
          id: ther.therapistId,
          score: 1,
        });
      }
      console.log('already counted', alreadyCounted);
      filteredTherapistsWithScoreCopy.sort((a, b) => b.score - a.score);
    }

    // final therapist info WITHOUT specializations

    let filteredTherapistsWithSpecializationsCopy = [
      ...filteredTherapistsWithSpecializations,
    ];

    filteredTherapistsWithSpecializationsCopy = dataFilteredTherapists.map(
      (ther: FilteredTherapists) => {
        const copyFilteredTherapistsWithSpecializations =
          specializationProps.find((s) => ther.specializationId === s.value);
        return {
          therapistId: ther.therapistId,
          specializationId: ther.specializationId,
          specializationName: copyFilteredTherapistsWithSpecializations?.label,
        };
      },
    );

    console.log('filtered copy', filteredTherapistsWithSpecializationsCopy);

    setFilteredTherapists(dataFilteredTherapists);
    setFilteredTherapistsWithSpecializations(
      filteredTherapistsWithSpecializationsCopy,
    );
    setFilteredTherapistsWithScore(filteredTherapistsWithScoreCopy);

    console.log(
      'filtered therapists with spec',
      filteredTherapistsWithSpecializations,
    );

    setLoading(true);
    executeScroll();

    if ('errors' in data) {
      setError(data.errors[0].message);
      return;
    }
  };

  console.log('score', filteredTherapistsWithScore);
  console.log('!!!!!', filteredTherapists);

  // post request to add to favorites for user

  // const addToFavorite = async (therapistId: number, userId: number) => {
  //   const response = await fetch(`/api/favorites`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       userId: userId,
  //       therapistId: therapistId,
  //     }),
  //   });

  //   const json = await response.json();
  //   if ('errors' in json) {
  //     setError(json.errors[0].message);
  //     return;
  //   }
  // };

  // useState to check status of favorites

  // const [isFavorite, setIsFavorite] = useState(false);

  // event handler add to favorites

  // function addToFavoritesHandler() {
  //   addToFavorite(props.userId, finalTherapists.id);
  //   setIsFavorite(true);
  // }

  return (
    <Layout email={props.email} userId={props.userId}>
      <Head>
        <title>Find a therapist</title>
      </Head>
      <div css={pageContainer}>
        <section css={searchContainer}>
          <div css={searchHeadingContainer}>
            <h2>What are you looking for?</h2>
          </div>
          <form onSubmit={formSubmit}>
            <div css={searchItemsContainer}>
              <div css={singleItemContainerSpecializations}>
                <div css={itemHeading}>I need help with:</div>
                <div css={itemDropdown}>
                  <Select
                    onChange={(
                      selectedOption: ValueType<SpecializationType, true>,
                    ) =>
                      handleTypeSelect(selectedOption as SpecializationType[])
                    }
                    isMulti
                    options={
                      selectedSpecializations.length === maxOptions
                        ? []
                        : props.specialization
                    }
                    noOptionsMessage={() => {
                      return selectedSpecializations.length === maxOptions
                        ? 'You cannot choose more than 4 specializations'
                        : 'No options available';
                    }}
                    value={selectedSpecializations}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading}>Region:</div>
                <div>
                  <Select
                    options={regionOptions}
                    value={region}
                    onChange={(
                      selectedOption: ValueType<RegionType, false>,
                    ) => {
                      setRegion(selectedOption as RegionType);
                    }}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading}>ZIP Code:</div>
                <div>
                  <Select
                    options={zipCodeOptions}
                    value={zipCode}
                    onChange={(
                      selectedOption: ValueType<ZipCodeType, false>,
                    ) => {
                      setZipCode(selectedOption as ZipCodeType);
                    }}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading} />
                <button css={buttonStylesDark}>Search</button>
              </div>
            </div>

            <div css={imageContainer}>
              <img
                src="/images/women_chatting_2.png"
                alt="two women sitting on floor and chatting in front of buildings and trees"
              />
            </div>
          </form>
        </section>
        <section css={resultsContainer}>
          {!loading ? (
            <>
              <div style={{ display: 'none' }} ref={divRef} />
              <div css={errorStyles}>{error}</div>
            </>
          ) : filteredTherapistsWithScore.length === 0 ? (
            <>
              <div
                css={resultsHeadingContainer}
                ref={divRef}
                style={{
                  height: 200,
                }}
              >
                <h2>
                  Sorry, there are no therapists that match your search
                  criteria. Please try another request! <FaHeart />
                </h2>
              </div>
              <div css={errorStyles}>{error}</div>
            </>
          ) : (
            <>
              <div css={errorStyles}>{error}</div>
              <div css={resultsHeadingContainer} ref={divRef}>
                <h1>It's a match!</h1>
              </div>
              {finalTherapists.map((therapist) => {
                return (
                  <div css={singleTherapistContainer} key={therapist.id}>
                    <div css={therapistContainer}>
                      <div css={leftInfoContainer}>
                        <div css={therapistNameContainer}>
                          {therapist.companyName}
                        </div>
                        <div css={videoContainer}>
                          <video src={therapist.videoUrl} controls>
                            <track
                              src="captions_en.vtt"
                              kind="captions"
                              srcLang="en"
                              label="english_captions"
                            />
                          </video>
                        </div>
                      </div>
                      <div css={rightInfoContainer}>
                        <div css={headingContainer}>
                          <div css={headlineContainer}>Specializations</div>
                          <div css={favoritesContainer}>
                            <FaRegHeart />
                          </div>
                        </div>
                        <div css={specializationsContainer}>
                          {filteredTherapistsWithSpecializations
                            .filter(
                              (specialization) =>
                                specialization.therapistId === therapist.id,
                            )
                            .map((spec) => (
                              <div
                                key={spec.specializationId}
                                css={coloredButtonStyles}
                              >
                                {spec.specializationName}
                              </div>
                            ))}
                        </div>
                        <div css={otherInfosContainer}>
                          <div css={iconContainer}>
                            <GoLocation size={32} />{' '}
                          </div>
                          <div css={addressContainer}>
                            {therapist.addressStreet} {therapist.addressNumber},{' '}
                            {therapist.zipCode} {therapist.region}
                          </div>
                        </div>
                        <div css={otherInfosContainer}>
                          <div css={iconContainer}>
                            <AiOutlineEuro size={32} />{' '}
                          </div>
                          <div css={priceContainer}>
                            {therapist.costPerHour} € / hour
                          </div>
                        </div>
                        <div css={otherInfosContainer}>
                          <div css={iconContainer}>
                            <FiExternalLink size={32} />
                          </div>
                          <div css={websiteContainer}>
                            {' '}
                            <Link href={`${therapist.websiteUrl}`}>
                              <a target="blank">Visit website</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div css={matchingPercentageContainer}>
                      <div css={matchingPercentageBox}>
                        {Math.round(
                          (therapist.score / selectedSpecializations.length) *
                            100,
                        )}{' '}
                        %
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const {
    getAllSpecializations,
    getAllTherapistsSpecializations,
    getAllTherapists,
  } = await import('../util/database');

  console.log('list of all specializations', getAllSpecializations);

  const specialization = await getAllSpecializations();
  console.log('specializations list', specialization);

  // this is an array of objects consisting of all specializationIds and therapistIds
  const therapistSpecializations = await getAllTherapistsSpecializations();
  console.log('therapist specializations list', therapistSpecializations);

  // this is an array of objects containing all information from each therapist
  const allTherapists = await getAllTherapists();
  console.log('all therapists', allTherapists);

  return {
    props: {
      specialization: specialization.map((spec) => {
        return {
          value: spec.id,
          label: spec.specializationName,
        };
      }),
      therapistSpecializations: therapistSpecializations,
      therapists: allTherapists,
    },
  };
}
