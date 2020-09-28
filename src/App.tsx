import React, { useState } from 'react'

import Topbar from 'src/organisms/Topbar'
import fetchAPI, { GithubTrendingType } from 'src/GithubTrendingAPI'
import Spinner from 'src/atoms/Spinner';
import DeveloperTable from './atoms/DeveloperTable';

const App: React.FC = () => {

  const API_NOT_LOADED_STATE: GithubTrendingType = []
  const [apiResponse, setApiResponse] = useState<GithubTrendingType>(API_NOT_LOADED_STATE);
  useEffect(() => {
  fetchAPI().then((results) => setApiResponse(results))
  }, [])

  if (apiResponse === API_NOT_LOADED_STATE)
    return (
      <Spinner />
    )
  else {
    return (
      <>
        <Topbar
          apiData={apiResponse}
        />
        <DeveloperTable
          data={apiResponse}
        />
      </>
    );
  }
}

export default App