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
const FRAMEWORKS = [/rails/i, /react(?:js)?/i]
const IN_TRENDS_SINCE = 'monthly'

const filterByFrameworks = (developers: GithubTrendingType, frameworks = FRAMEWORKS): GithubTrendingType => {
    return developers.filter((developer) => {
        const { name, description } = developer.repo;
        return frameworks.map(framework => framework.test(name) || framework.test(description)).some(x => x === true)
    })
}

export const fetchAPI = async (languages: string[] = LANGUAGES): Promise<GithubTrendingType> => {
    // Create and send requests
    const requestPool: Promise<any>[] = []
    languages.forEach((language) => {
        const request = fetchDevelopers({ language, since: IN_TRENDS_SINCE })
        requestPool.push(request as Promise<GithubTrendingType>)
    })

    // Push the filtered results to one flattened array
    const allDevelopers: GithubTrendingType = [];
    const results = await Promise.all(requestPool)
    results.forEach((developpers) => allDevelopers.push(...filterByFrameworks(developpers)))
    return allDevelopers
}

export default fetchAPI;