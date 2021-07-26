import Select from 'react-select';

const customStyles = {
  container: (provided) => ({
    ...provided,
    height: '32px',
    width: '300px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '32px',
  }),
  control: (provided) => ({
    ...provided,
    height: '32px',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '32px',
  }),
  input: (provided) => ({
    ...provided,
    height: '32px',
  }),
};

export default function ReactSelect({ ...rest }) {
  return <Select styles={customStyles} {...rest} />;
}
