import { fetchDevelopers } from '@huchenme/github-trending';

// type of the items recieved by the API 
export type TrendingDev = {
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
export type framework = 'Rails' | 'React';
export type frameworks = Array<framework>
export type TrendingDevWithFrameworks = TrendingDev & { frameworks: frameworks }

export type GithubTrendings = TrendingDevWithFrameworks[]

const LANGUAGES = ['ruby', 'javascript', 'typescript']
const FRAMEWORKS: Array<{ name: framework, regex: RegExp }> = [
    { name: 'Rails', regex: /rails/i },
    { name: 'React', regex: /react(?:js)?/i }
]
const IN_TRENDS_SINCE = 'monthly'

const filterAndLabelByFrameworks = (developers: TrendingDev[], frameworks = FRAMEWORKS): TrendingDevWithFrameworks[] => {
    const developersWithFrameworks = developers.reduce<TrendingDevWithFrameworks[]>((acc, developer) => {
        const dev: TrendingDevWithFrameworks = { ...developer, frameworks: [] }
        const { name: devName, description: devDescription } = developer.repo;

        // Add matching framework(s) to the dev
        frameworks.forEach(({ name, regex }, i) => {
            if (regex.test(devName) || regex.test(devDescription)) {
                dev.frameworks.push(name)
            }
        })

        // Add developer that match at least one framework
        if (dev.frameworks.length > 0) {
            acc.push(dev)
        }
        return acc
    }, [])
    return developersWithFrameworks.filter(x => x)
}

export const fetchAPI = async (languages: string[] = LANGUAGES): Promise<GithubTrendings> => {
    // Create and send requests
    const requestPool: Promise<any>[] = []
    languages.forEach((language) => {
        const request = fetchDevelopers({ language, since: IN_TRENDS_SINCE })
        requestPool.push(request as Promise<GithubTrendings>)
    })

    // Push the filtered results to one flattened array
    const allDevelopers: GithubTrendings = [];
    const results = await Promise.all(requestPool)
    results.forEach((developpers) => allDevelopers.push(...filterAndLabelByFrameworks(developpers)))
    return allDevelopers
}

export default fetchAPI;