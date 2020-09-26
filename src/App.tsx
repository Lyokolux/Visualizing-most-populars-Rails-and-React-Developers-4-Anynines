import React, { useEffect } from 'react'

import Topbar from 'src/organisms/Topbar'
import GithubTrending, { populateGithubTrending, GithubTrendingType } from 'src/contexts/GithubTrending'

const App: React.FC = () => {
  const developers: GithubTrendingType = [];

  useEffect(() => {
    populateGithubTrending().then((population) => {
      developers.push(...population)
    })
  }, [developers])

  return (
    <GithubTrending.Provider value={developers} >
      <Topbar />
    </GithubTrending.Provider>
  );
}

export default App