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

export type GithubTrendingType = devInTrends[]

const LANGUAGES = ['ruby', 'javascript', 'typescript']

export const fetchAPI = async (languages: string[] = LANGUAGES): Promise<GithubTrendingType> => {
    // Send requests
    const requests: Promise<any>[] = []
    languages.forEach((language) => {
        requests.push(fetchDevelopers({ language }) as Promise<devInTrends[]>)
    })

    // Push the results to one flattened array
    const allDevelopers: devInTrends[] = [];
    const results = await Promise.all(requests)
    results.forEach((developpers) => allDevelopers.push(...developpers))
    return allDevelopers
}

export default fetchAPI;