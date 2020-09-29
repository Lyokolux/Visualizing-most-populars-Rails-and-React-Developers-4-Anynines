import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import fetchAPI, { GithubTrendings } from 'src/GithubTrendingAPI'

import Topbar from 'src/organisms/Topbar'
import Spinner from 'src/atoms/Spinner';
import DeveloperTable from 'src/molecules/DeveloperTable';
import Footer from 'src/atoms/Footer'

export type frameworkFilter = 'Rails' | 'Both' | 'React'
export type developerFilter = string | null

const App: React.FC = () => {

  const API_NOT_LOADED_STATE = null
  const [apiResponse, setApiResponse] = useState<GithubTrendings | null>(API_NOT_LOADED_STATE);
  useEffect(() => {
    fetchAPI().then((results) => setApiResponse(results))
  }, [])

  const [developerFilter, setDeveloperFilter] = useState<developerFilter>(null)
  const [frameworkFilter, setFrameworkFilter] = useState<frameworkFilter>('Both')

  if (apiResponse === API_NOT_LOADED_STATE)
    return (
      <Spinner />
    )
  else {
    return (
      <StyledApp>
        <Topbar
          apiData={apiResponse}
          filterSetters={{ developer: setDeveloperFilter, framework: setFrameworkFilter }}
        />
        <DeveloperTable
          data={apiResponse}
          filters={{ developer: developerFilter, framework: frameworkFilter }}
        />
        <Footer />
      </StyledApp>
    );
  }
}

export default App

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 10vh 75vh 15vh;
  grid-template-columns: 100%;

  @media only screen and (max-height: 842px) {
    grid-template-rows: 15vh auto; /* Hide the footer (off the grid), FIXME: tricky thing */
  }
`