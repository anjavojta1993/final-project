import React, { useState } from 'react';
import Select from 'react-select';

export default function Specializations(props) {
  const maxOptions = 5;
  const [selectedSpecializations, setSelectedSpecializations] = useState('');
  const handleTypeSelect = (event) => {
    setSelectedSpecializations(event);
    console.log(event);
  };

  console.log('props spec options', props.specializationOptions);
  console.log('therapist choice of specializations', selectedSpecializations);
  return (
    <Select
      onChange={handleTypeSelect}
      isMulti
      options={
        selectedSpecializations.length === maxOptions
          ? []
          : props.specializationOptions
      }
      noOptionsMessage={() => {
        return selectedSpecializations.length === maxOptions
          ? 'You cannot choose more than 5 specializations'
          : 'No options available';
      }}
      value={selectedSpecializations}
    />
  );
}
