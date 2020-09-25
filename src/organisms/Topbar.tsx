import React from 'react';
import styled from 'styled-components';

import logo from 'src/assets/logo.svg'
import Logo from 'src/atoms/Logo'
import LookupBar from 'src/molecules/LookupBar'


const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    min-height: 10vh;
    max-height: 20vh;
    font-size: calc(10px + 2vmin);
    color: white;
`

// TODO: use the results of the HTTP query
const fakeOptions = [
  { label: 'Paris' },
  { label: 'New York' },
  { label: 'San Fransisco' },
  { label: 'Madrid' },
  { label: 'Miami' },
  { label: 'London' },
  { label: 'Tokyo' },
  { label: 'Barcelona' },
  { label: 'La Habana' },
  { label: 'Buenos Aires' },
  { label: 'Sao Paulo' },
  { label: 'Toronto' },
]

const Topbar: React.FC = () => {
  return (
    <StyledHeader>
      <Logo src={logo} alt="logo" />
      <LookupBar
        options={fakeOptions}
      />
    </StyledHeader>
  );
}

export default Topbar;
