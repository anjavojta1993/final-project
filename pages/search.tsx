import { css } from '@emotion/react';
import Head from 'next/head';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { getScrollParent } from 'react-select/src/utils';
import Layout from '../components/Layout';
import { h1, h2, largeText, normalText } from '../styles/sharedStyles';
import {
  ApplicationError,
  FilteredTherapists,
  FilteredTherapistsWithScore,
  RegionType,
  Specialization,
  SpecializationType,
  Therapist,
  TherapistRegionZipCode,
  TherapistSpecializationType,
  User,
  ZipCodeType,
} from '../util/types';

type Props = {
  user?: User;
  therapist?: Therapist;
  email: string;
  errors?: ApplicationError[];
  specializationName: string;
  specialization: SpecializationType[];
  therapistSpecializations: TherapistSpecializationType[];
  therapistRegionAndZipCode: TherapistRegionZipCode[];
  userId: Number;
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
  background-color: green;
`;

const resultsContainer = css`
  display: flex;
  background-color: orange;
  flex-direction: column;
`;

const imageContainer = css`
  //position: absolute;
  //background-color: blue;
  top: 30%;
  text-align: right;
  margin-left: auto;
  margin-right: 0;

  width: 1000px;
  /* left: 50%;
  transform: translateX(-50%); */

  > img {
    width: 70%;
    height: auto;
    margin-right: 0;
    //background-color: orange;
  }
`;

const searchHeadingContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  //background-color: orange;

  h1 {
    font-size: ${h1};
    line-height: 1.5em;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
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
  //background-color: red;
  width: 400px;
  height: 100px;
`;

const singleItemContainer = css`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  flex-direction: column;
  //background-color: red;
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

const heroButtonsContainer = css`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 800px;
  height: auto;
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
  width: 80%;
  height: 300px;
`;

const therapistContainer = css`
  display: flex;
  width: 80%;
  height: 250px;
`;

const leftInfoContainer = css`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 250px;
`;

const therapistNameContainer = css`
  display: flex;
  width: auto;
  height: 20%;
`;

const videoContainer = css`
  display: flex;
  width: auto;
  height: 80%;
`;

const rightInfoContainer = css`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 250px;
`;

const headingContainer = css`
  display: flex;
  width: auto;
  height: 20%;
`;

const headlineContainer = css`
  display: flex;
  width: auto;
  height: 20%;
`;

const favoritesContainer = css`
  display: flex;
  width: auto;
  height: 20%;
`;

const specializationsContainer = css`
  display: flex;
  width: auto;
  height: 60%;
`;

const otherInfosContainer = css`
  display: flex;
  width: auto;
  height: 20%;
`;

const addressContainer = css`
  display: flex;
  width: 40%;
  height: auto;
`;

const priceContainer = css`
  display: flex;
  width: 20%;
  height: auto;
`;

const websiteContainer = css`
  display: flex;
  width: 40%;
  height: auto;
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

export default function SearchForTherapist(props: Props) {
  const [loading, setLoading] = useState(false);

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

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [error, setError] = useState('');

  // define variables for filtered therapists, that all match region AND zipcode AND at least one of the chosen specializations

  const [filteredTherapists, setFilteredTherapists] = useState<
    FilteredTherapists[]
  >([]);

  // define variable for final therapist scoreboard

  const filteredTherapistsWithScore: FilteredTherapistsWithScore[] = [];

  // function to send information to API
  const formSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientRegion: region?.value,
        clientZipCode: zipCode?.value,
        clientSpecializationsIds: selectedSpecializations.map(
          (spec) => spec.value,
        ),
      }),
    });

    executeScroll();
    setLoading(true);

    const data = await response.json();
    setFilteredTherapists(data.filteredTherapistsSpecializations);
    console.log('data', data);
    console.log('data filtered', data.filteredTherapistsSpecializations);
    console.log('filtered therapists', filteredTherapists);

    // const checkScore = async () => {
    //   await filteredTherapists;
    //   console.log('awaited filtered therapists', filteredTherapists);
    //   filteredTherapists.map((ther: any) => {
    //     let count = 0;
    //     if (ther.id === ther.therapistId) {
    //       return filteredTherapistsWithScore.push({
    //         id: ther.therapistId,
    //         count: count++,
    //       });
    //     }
    //   });
    // };

    // checkScore();

    // function getScore(id: number, ther: FilteredTherapists[]) {
    //   let count = 0;

    //   for (var i = 0; i < ther.length; i++) {
    //     if ('id' in ther[i] && ther[i].therapistId === id) count++;
    //   }

    //   return filteredTherapistsWithScore.push({
    //     id: ther[i].therapistId,
    //     count: count,
    //   });
    // }

    // filteredTherapists.forEach(getScore);

    // filteredTherapists.reduce(function (
    //     acc,
    //     curr,
    //   ) {
    //     return (
    //       acc[curr.therapistId]
    //         ? ++acc[curr.therapistId]
    //         : (acc[curr.therapistId] = 1),
    //       acc
    //     );
    //     filteredTherapistsWithScore.push({
    //           id: ther[i].therapistId,
    //           count: count,
    //         })
    //   }

    // filteredTherapists
    //   .reduce((ther, count) => {
    //     if (ther.therapistId.has(count)) ther.therapistId.set(count, ther.therapistId.get(count) + 1);
    //     else ther.therapistId.set(count, 1);
    //     return ther;
    //   }, new Map())
    //   .forEach((, count, map) => {
    //     filteredTherapistsWithScore.push({
    //       id: id,
    //       count: count,
    //     });
    //   });

    // THIS IS WORKING BUT IN AN OBJECT

    // const filteredTherapistWithScore = filteredTherapists.reduce(function (
    //   acc,
    //   curr,
    // ) {
    //   return (
    //     acc[curr.therapistId]
    //       ? ++acc[curr.therapistId]
    //       : (acc[curr.therapistId] = 1),
    //     acc
    //   );
    // },
    // {});

    // function findCount(filteredTherapistsWithScore, key) {
    //   filteredTherapists.forEach((x) => {
    //     // Checking if there is any object in arr2
    //     // which contains the key value
    //     if (
    //       filteredTherapistsWithScore.some((val) => {
    //         return val[key.therapistId] === x[key.therapistId];
    //       })
    //     ) {
    //       // If yes! then increase the occurrence by 1
    //       filteredTherapistsWithScore.forEach((k) => {
    //         if (k[key.therapistId] === x[key.therapistId]) {
    //           k['count']++;
    //         }
    //       });
    //     } else {
    //       // If not! Then create a new object initialize
    //       // it with the present iteration key's value and
    //       // set the occurrence to 1
    //       let a = {};
    //       a[key] = x[key];
    //       a['count'] = 1;
    //       filteredTherapistsWithScore.push(a);
    //     }
    //   });

    //   return filteredTherapistsWithScore;
    // }

    for (const ther of filteredTherapists) {
      const alreadyCounted = filteredTherapistsWithScore.map(
        (therapist) => therapist.id,
      );
      if (alreadyCounted.includes(ther.therapistId)) {
        filteredTherapistsWithScore[
          alreadyCounted.indexOf(ther.therapistId)
        ].score += 1;
      } else {
        filteredTherapistsWithScore.push({ id: ther.therapistId, score: 1 });
      }
      filteredTherapistsWithScore.sort((a, b) => b.score - a.score);
    }

    console.log('score', filteredTherapistsWithScore);

    // const countFunction = (keys: any) => {
    //   filteredTherapistsWithScore[keys.therapistId] =
    //     ++filteredTherapistsWithScore[keys.therapistId] || 1;
    // };

    // filteredTherapists.forEach(countFunction);

    if ('errors' in data) {
      setError(data.errors[0].message);
      return;
    }
  };

  return (
    <Layout email={props.email}>
      <Head>
        <title>Find a therapist</title>
      </Head>
      <div css={pageContainer}>
        <section css={searchContainer}>
          <div css={searchHeadingContainer}>
            <h1>What are you looking for?</h1>
          </div>
          <form onSubmit={formSubmit}>
            <div css={searchItemsContainer}>
              <div css={singleItemContainerSpecializations}>
                <div css={itemHeading}>I need help with:</div>
                <div css={itemDropdown}>
                  <Select
                    onChange={(selectedOption: ValueType<SpecializationType>) =>
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
                    onChange={(event) => {
                      setRegion(event);
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
                    onChange={(event) => {
                      setZipCode(event);
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
            <div css={searchHeadingContainer} ref={myRef} />
          ) : filteredTherapists.length === 0 ? (
            <div css={searchHeadingContainer} ref={myRef}>
              <h1>
                Sorry, there are no therapists that match your search criteria.
                Please try another request!
              </h1>
            </div>
          ) : (
            <>
              <div css={searchHeadingContainer} ref={myRef}>
                <h1>It's a match!</h1>
              </div>
              {/* // TODO function: for each therapists that matches return the following divs */}
              <div css={singleTherapistContainer}>
                <div css={therapistContainer}>
                  <div css={leftInfoContainer}>
                    <div css={therapistNameContainer}>THER NAME PROPS</div>
                    <div css={videoContainer}>VIDEO PROPS</div>
                  </div>
                  <div css={rightInfoContainer}>
                    <div css={headingContainer}>
                      <div css={headlineContainer}>AREAS OF EXPERTISE</div>
                      <div css={favoritesContainer}>FAVORITES HEART</div>
                    </div>
                    <div css={specializationsContainer}>SPECIALIZATIONS</div>
                    <div css={otherInfosContainer}>
                      <div css={addressContainer}>ICON + ADDRESS</div>
                      <div css={priceContainer}>PRICE</div>
                      <div css={websiteContainer}>WEBSITE LINK</div>
                    </div>
                  </div>
                </div>
                <div css={matchingPercentageContainer}>MATCHING PERCENTAGE</div>
              </div>
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

  const allTherapists = await getAllTherapists();
  console.log('all therapists', allTherapists);

  // this is an array of objects consisting of all regions & zip codes for each therapist id
  // const therapistRegionAndZipCode = await getAllRegionsAndZipCodes();
  // console.log('therapist region and zip code', therapistRegionAndZipCode);

  // const filteredTherapistsAndSpecializations =
  //   await getFilteredTherapistsAndSpecializations(
  //     region.value,
  //     zipCode.value,
  //     selectedSpecializations.map((spec: any) => spec.value),
  //   );
  // console.log('filtered therapists', filteredTherapistsAndSpecializations);
  // console.log('testing in props', selectedSpecializations);

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
