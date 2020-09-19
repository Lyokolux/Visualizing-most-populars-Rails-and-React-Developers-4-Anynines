# Visualizing the most popular Rails and React Developers for Anynines

## Install and usage

First install the dependancies : `yarn install`
run in dev mode : `yarn start`

run the tests : `yarn test`
build for production: `yarn build`

## Requirements

>Create a react.js application to visualize the most popular Ruby on Rails and React developers. The users should be searchable and/or filterable. You can use your own approach and technology stack to do the job. If it is hard for you to decide which technologies to use, here is what we use at the moment to build frontend applications:
- **Functional Components** : since React Hooks have been added to the core library we prefer to use functional components exclusively.
- **Context API** : we prefer to manage the state of the single page application with the context API instead of Redux.
- **Styled Components**: we use Styled Components, a CSS-in-JS library to style our components in react.
- **TypeScript**: for Developer Experience and Type safety we use TypeScript instead of JavaScript.
- **Storybook**: to document our components we use storybook.

Again, you don’t have to use all of those libraries or approaches, the list is just for your information and to help you make a decision in doubt.
The results of the API query should be presented on a single page. The response should have the following format:

```json
[
    {   
        "name": "Mike Perham",  
        "username": "mperham",
        "avatar": "https://avatars0.githubusercontent.com/u/xxxx",  
        "repo": {
            "name": "repository name",
            "description": "project description",
            "url": "https://github.com/username/project "
        }
    },
]
```

You can use the github-trending-api project to fetch that information in JSON format, see https://github.com/huchenme/github-trending-api#trending-developers - as an example.

We want to you to show us how you would develop an application usually. This means how your code looks like, how you document your code and whatever tools you usually use. So we appreciate your own ideas very much.

Push your result in your GitHub account in a public repository and let us know about that repository. Good luck and have fun. 👍
