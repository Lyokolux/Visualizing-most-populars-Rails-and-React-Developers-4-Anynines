import React, { useState } from 'react';
import styled from 'styled-components';
import { Lookup } from 'react-rainbow-components';
import { LookupValue } from 'react-rainbow-components/components/types';

import logo from 'src/assets/logo.svg'

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    min-height: 10vh;
    max-height: 20vh;
    font-size: calc(10px + 2vmin);
    color: white;
`

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
`

const LOOKUP_INTERNAL_STYLES = {
  maxWidth: 5000,
}

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
]

const Topbar: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [options, setOptions] = useState<LookupValue[] | undefined>(undefined)

  const filter = (query: string, options: LookupValue[]): LookupValue[] => {
    if (query) {
      const regex = new RegExp(query, 'i')
      return options.filter(item => {
        const label = item.label as string
        return regex.test(label)
      });
    }
    return [];
  }

  const search = (input: string) => {
    if (options && value && input.length > value.length) {
      setOptions(filter(input, options))
      setValue(input)
    } else if (input) {
      setValue(input)
      setOptions(filter(input, fakeOptions))
    } else {
      setValue('')
      setOptions(undefined) // reset options to the default list
    }
  }

  const handleLookupChange = (value: LookupValue | null): void => {
    if (value !== null && value.label !== undefined)
      setValue(value.label)
    else
      setValue('')
  }

  return (
    <StyledHeader>
      <Logo src={logo} alt="logo" />
      <Lookup
        id="searchbar"
        options={options}
        value={value as LookupValue}
        onChange={handleLookupChange}
        onSearch={search}
        style={LOOKUP_INTERNAL_STYLES}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />
    </StyledHeader>
  );
}

export default Topbar;