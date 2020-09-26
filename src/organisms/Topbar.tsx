import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import logo from 'src/assets/logo.svg'
import Logo from 'src/atoms/Logo'
import LookupBar from 'src/molecules/LookupBar'
import ButtonsGroupPicker from 'src/molecules/ButtonsGroupPicker'
import GithubTrending, { devInTrends } from 'src/contexts/GithubTrending';
import { LookupValue } from 'react-rainbow-components/components/types';



const StyledHeader = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
    max-height: 20vh;
    font-size: calc(10px + 2vmin);
    color: white;
`

const toDeveloperNames = (developers: devInTrends[]): LookupValue[] => {
  return developers.map(developer => {
    return {
      label: `${developer.name}, ${developer.username}`
    }
  })
}

const Topbar: React.FC = () => {
  const developerTrends = useContext(GithubTrending)

  const [developerNames, setDeveloperNames] = useState<LookupValue[]>([])
  useEffect(() => {
    setDeveloperNames(toDeveloperNames(developerTrends))
  }, [developerTrends])


  return (
    <StyledHeader>
      <Logo src={logo} alt="logo" />
      <LookupBar
        options={developerNames}
      />
      <ButtonsGroupPicker
        options={[
          { name: "Rails", label: "Rails" },
          { name: "Both", label: "Both" },
          { name: "React", label: "React" }
        ]}
      />
    </StyledHeader>
  );
}

export default Topbar;
