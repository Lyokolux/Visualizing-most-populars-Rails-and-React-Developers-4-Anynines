import React from 'react';
import styled from 'styled-components';

import logo from 'src/assets/logo.svg'
import Logo from 'src/atoms/Logo'
import LookupBar from 'src/molecules/LookupBar'
import ButtonsGroupPicker from 'src/molecules/ButtonsGroupPicker'
import { TrendingDev, GithubTrendings } from 'src/GithubTrendingAPI';
import { LookupValue } from 'react-rainbow-components/components/types';

export type TopBarProps = {
  apiData: GithubTrendings,
  filterSetters: {
    developer: React.Dispatch<React.SetStateAction<any>>,
    framework: React.Dispatch<React.SetStateAction<any>>
  }
}

const toDeveloperNames = (developers: TrendingDev[]): LookupValue[] => {
  return developers.map(developer => {
    return {
      label: `${developer.name}, ${developer.username}`
    }
  })
}

const Topbar: React.FC<TopBarProps> = (props) => {

  return (
    <StyledHeader>
      <Logo src={logo} alt="logo" />
      <LookupBar
        options={toDeveloperNames(props.apiData)}
        onChange={props.filterSetters.developer}
      />
      <ButtonsGroupPicker
        options={[
          { name: "Rails", label: "Rails" },
          { name: "Both", label: "Both" },
          { name: "React", label: "React" }
        ]}
        onChange={props.filterSetters.framework}
      />
    </StyledHeader>
  );
}

export default Topbar;

const StyledHeader = styled.header`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
    font-size: calc(1rem + 2vmin);

`