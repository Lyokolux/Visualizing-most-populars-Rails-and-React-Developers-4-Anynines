import React from 'react';
import { fetchDevelopers } from '@huchenme/github-trending';

export type devInTrends = {
    username: string,
    name: string,
    url: string,
    avatar: string,
    repo: {
        name: string,
        description: string,
        url: string
    }
}

export type GithubTrendingType = {
    developers: devInTrends[]
}

const LANGUAGES = ['ruby', 'javascript', 'typescript']

const fetchDeveloppersByLanguage = (languages: string[]): devInTrends[] => {
    // Send requests
    const requests: Promise<any>[] = []
    languages.forEach((language) => {
        requests.push(fetchDevelopers({ language }) as Promise<devInTrends[]>)
    })

    // Push the results to one flattened array
    const allDevelopers: devInTrends[] = [];
    Promise.all(requests).then((results) =>
        results.forEach((developpers) => allDevelopers.push(...developpers))
    )
    return allDevelopers
}

const GithubTrending = React.createContext(fetchDeveloppersByLanguage(LANGUAGES))

export default GithubTrending;