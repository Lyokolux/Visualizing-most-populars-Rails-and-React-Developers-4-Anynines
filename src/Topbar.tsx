import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import styled from 'styled-components';
import './topbar.scss';

import { Lookup } from 'react-rainbow-components';
import { LookupValue } from 'react-rainbow-components/components/types';

const LookupInternalStyles = {
  maxWidth: 700,
};

const StyledHeader = styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Logo = styled.img`
  height: 10vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    animation: App-logo-spin infinite 20s linear;
  }
`;

// TODO: use the ones of the HTTP query
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
];

const Topbar: React.FC = () => {
  const [value, setValue] = useState<LookupValue>({ label: '' })
  const [options, setOptions] = useState<LookupValue[]>(fakeOptions)

  const filter = (query: string, options: LookupValue[]): LookupValue[] => {
    if (query) {
      const regex = new RegExp(query, 'i');
      return options.filter(item => {
        const label = item.label as string;
        return regex.test(label);
      });
    }
    return [];
  }

  const search = (input: string) => {
    const label = value.label as string;
    if (options && label && input.length > label.length) {
      setOptions(filter(input, options))
      setValue({ label: input })
    } else if (input) {
      setValue({ label: input });
      setOptions(filter(input, options))
    } else {
      setValue({ label: '' })
      setOptions([])
    }
  }

  return (
    <StyledHeader>
      <Logo src={logo} alt="logo" />
      <Lookup
        id="lookup-1"
        label="Lookup Label"
        placeholder="Search through"
        options={options}
        value={value}
        onChange={value => setValue({ label: value as string })}
        onSearch={search}
        style={LookupInternalStyles}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />
    </StyledHeader>
  );
}

export default Topbar;