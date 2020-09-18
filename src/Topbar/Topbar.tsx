import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import './topbar.scss'

import { Lookup } from 'react-rainbow-components';
import { LookupValue } from 'react-rainbow-components/components/types';

const containerStyles = {
  maxWidth: 700,
};

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

function filter(query: string, options: LookupValue[]): LookupValue[] {
  if (query) {
    const regex = new RegExp(query, 'i');
    return options.filter(item => {
      const label = item.label as string;
      return regex.test(label);
    });
  }
  return [];
}

const Topbar: React.FC = () => {
  const [value, setValue] = useState<LookupValue>({ label: '' })
  const [options, setOptions] = useState<LookupValue[]>(fakeOptions)

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
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <Lookup
        id="lookup-1"
        label="Lookup Label"
        placeholder="Find"
        options={options}
        value={value}
        onChange={value => setValue({ label: value as string })}
        onSearch={search}
        style={containerStyles}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />
    </header>
  );
}

export default Topbar;