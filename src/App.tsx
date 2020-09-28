import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import fetchAPI, { GithubTrendingType } from 'src/GithubTrendingAPI'

import Topbar from 'src/organisms/Topbar'
import Spinner from 'src/atoms/Spinner';
import DeveloperTable from './atoms/DeveloperTable';

const StyledApp = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
`

const developerTablesStyles: React.CSSProperties = {
  height: "70vh",
  alignSelf: "center"
}

const App: React.FC = () => {

  const API_NOT_LOADED_STATE = null
  const [apiResponse, setApiResponse] = useState<GithubTrendingType | null>(API_NOT_LOADED_STATE);
  useEffect(() => {
    fetchAPI().then((results) => setApiResponse(results))
  }, [])

  if (apiResponse === API_NOT_LOADED_STATE)
    return (
      <Spinner />
    )
  else {
    return (
      <StyledApp>
        <Topbar
          apiData={apiResponse}
        />
        <DeveloperTable
          styles={developerTablesStyles}
          data={apiResponse}
        />
      </StyledApp>
    );
  }
}

export default App