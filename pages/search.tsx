import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import Layout from '../components/Layout';
import { h1, h2, largeText, normalText } from '../styles/sharedStyles';
import {
  ApplicationError,
  Specialization,
  SpecializationType,
  Therapist,
  User,
} from '../util/types';

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
  position: relative;
  display: flex;
  width: 100%;
  height: 90vh;
  //background-color: green;
  flex-direction: column;
`;

const imageContainer = css`
  position: absolute;
  //background-color: blue;
  top: 30%;
  align-items: center;
  text-align: right;
  bottom: 0px;
  right: 0;
  width: 1000px;
  /* left: 50%;
  transform: translateX(-50%); */

  > img {
    width: 70%;
    height: auto;
    //background-color: orange;
  }
`;

const headingContainer = css`
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

const itemsContainer = css`
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

export default function SearchTherapist(props: Props) {
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

  const maxOptions = 4;

  const [selectedSpecializations, setSelectedSpecializations] =
    useState<SpecializationType[]>();

  console.log('client choice of specializations', selectedSpecializations);

  const handleTypeSelect = (selectedOption: SpecializationType[]) => {
    setSelectedSpecializations(selectedOption);
    console.log('selected option', selectedOption);
  };

  const [region, setRegion] = useState('Vienna');
  const [zipCode, setZipCode] = useState('');

  console.log('chosen region', region);

  return (
    <Layout email={props.email}>
      <Head>
        <title>Find a therapist</title>
      </Head>
      <div css={pageContainer}>
        <div css={headingContainer}>
          <h1>What are you looking for?</h1>
        </div>
        <div css={imageContainer}>
          <img
            src="/images/women_chatting_2.png"
            alt="two women sitting on floor and chatting in front of buildings and trees"
          />
        </div>
        <div css={itemsContainer}>
          <div css={singleItemContainerSpecializations}>
            <div css={itemHeading}>I need help with:</div>
            <div css={itemDropdown}>
              <Select
                onChange={(selectedOption: ValueType<SpecializationType>) =>
                  handleTypeSelect(selectedOption as SpecializationType[])
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
            <div css={itemHeading}></div>
            <button css={buttonStylesDark}>Search</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getAllSpecializations } = await import('../util/database');

  console.log('list of all specializations', getAllSpecializations);

  const specialization = await getAllSpecializations();
  console.log('specializations list', specialization);

  return {
    props: {
      specialization: specialization.map((spec) => {
        return {
          value: spec.id,
          label: spec.specializationName,
        };
      }),
    },
  };
}
