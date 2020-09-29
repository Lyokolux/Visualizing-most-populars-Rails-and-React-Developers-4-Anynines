
// import types from files to create a dependency, in case the types are changed or removed of the concerned module
// aliases are used to keep the original name
import { frameworkFilter as frameworkFilterAlias, developerFilter as developerFilterAlias } from 'src/App'
import { frameworks as frameworksAlias } from 'src/GithubTrendingAPI'

export type developerFilter = developerFilterAlias;
export type frameworkFilter = frameworkFilterAlias;

export type frameworks = frameworksAlias