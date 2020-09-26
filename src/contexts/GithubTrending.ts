import React from 'react';
import { fetchDevelopers } from '@huchenme/github-trending';

const LANGUAGES = ['ruby', 'javascript', 'typescript']

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

export type GithubTrendingType = devInTrends[] | null

export const populateGithubTrending = async (languages: string[] = LANGUAGES): Promise<devInTrends[]> => {
    // Send requests
    const requests: Promise<any>[] = []
    languages.forEach((language) => {
        requests.push(fetchDevelopers({ language }) as Promise<devInTrends[]>)
    })

    // Push the results to one flattened array
    const results = await Promise.all(requests)
    const allDevelopers: devInTrends[] = [];
    results.forEach((developpers) => allDevelopers.push(...developpers))
    return allDevelopers
}

const GithubTrending = React.createContext<GithubTrendingType>(null)

export default GithubTrending;