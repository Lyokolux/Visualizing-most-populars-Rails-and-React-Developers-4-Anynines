# 1. Technologies used in the project

Date: 2020-09-17
Updated: 2020-09-23

## Status

Living

## ✅ React
React will be used as Web Framework to easily build the SPA. As it is used by Anynines, it allows me to get into the framework since the last time I used it and to learn more about it.

### ✅ Functional Component
The documentation of React uses a lot of class-based component. But as the functional components are used at Anynines and offers more features since React 16., they will be used on this project for learning purposes.

### ❓ Context API
Can be used to link the filters and searches of the header / Topbar into the table. Still thinking about it; I need to learn how it is used first.

### ✅ Styled Component
Styled components provide a fast way to create React Component with css and as it is used by Anynines, it will be used in the project for learning purposes.

### ❌ Storybook
As the SPA is small, the components are generally used once in the app and are based on React Rainbow, so Storybook is overengineered to the current needs.

### ✅ React Rainbow Components
React Rainbow is a growing library of components to develop faster, providing every components used in a ordinary SPA.  
As the design is free, the library allows to concentrate on the architecture and main functionalities of the SPA instead of the design.

### ✅ Create React App (CRA)
As I never used CRA and wanted to get started fast, I gave it a try. After using it (and used `yarn eject` in the first project), CRA seems useful for small projects only. The impossiblity to create aliases for the import in ESM without tricks (`yarn eject` or via [craco](https://github.com/gsoft-inc/craco)) confirms my initial idea. At least, it keeps the project structure clean, allowing to focus on the features instead of the configuration 👍.

## ✅ Typescript
Typescript allows a better DX compared to Javascript: the completion and type-informations help to the development in the IDE. Thus Anynines uses it too. So it is for this project.

## Workflow with Git
As I am the only one involved in the project, I will develop feature after feature in a develop branch. When one is ready, develop will be merged into master and develop will be used to develop the next feature. Other solutions such as the workflow of Git Flow or the issues/PR of Github are over-kill for a project of this size.

### ✅ Gitmoji 😉
(extract of my Bachelorarbeit to explain the usage of gitmoji)

Gitmoji is a project to give meaning to emojis in the context of Git. It is especially suitable for commit messages. The reasons are that emojis allow for greater accuracy in commit messages and make git history more enjoyable. After learning their meanings, the commit messages become much clearer and accurate to what they change in the project.

The emoji can be entered as plain text on compatible platforms that support the Github Flabored Markdown (GFM): the emoji code between two colons, e.g. :pencil: for 📝. After some regressions on Gitlab and to ensure compatibility between platforms that don't support GFM, the tool [espanso](https://espanso.org/) can be used with the package [gitmojis](https://hub.espanso.org/packages/gitmojis/) to convert any emoji code to emoji directly as you type. This way the emojis code can be converted directly into Unicode characters; improving the compatibility.

The convention of Gitmoji is : `<gitmoji> description`. The format with a range makes the message more relevant : `<gitmoji>(range): description` ; with an optional range. If not specified, the message simply returns to the Gitmoji convention. This makes it possible to use a variety of types, including more specific types than those defined in the [Angular commits convention](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).

Compared to the Conventional Commits specification, [this normalization](https://github.com/carloscuesta/gitmoji/issues/442) replaces the type field with an emoji; replaces square brackets with brackets; and deletes colons if the range with a description is not specified. The body and footer of the commit message remains free.
