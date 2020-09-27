import React, { useState } from 'react'

import Topbar from 'src/organisms/Topbar'
import fetchAPI, { GithubTrendingType } from 'src/contexts/GithubTrendingAPI'
import Spinner from 'src/atoms/Spinner';

const App: React.FC = () => {

  const API_NOT_LOADED_STATE: GithubTrendingType = []
  const [apiResponse, setApiResponse] = useState<GithubTrendingType>(API_NOT_LOADED_STATE);
  fetchAPI().then((results) => setApiResponse(results))

  if (apiResponse === API_NOT_LOADED_STATE)
    return (
      <Spinner />
    )
  else {
    return (
      <Topbar
        apiData={apiResponse}
      />
    );
  }
}

export default App