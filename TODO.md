# TODO (top to bottom)

## ✅ MVP
- [x] Split the current architecture into atomic design
- [x] Add the filters in the Topbar
    - [x] by language
        - [x] add reactivity
    - [x] ascending/descending → directly done by the DeveloperTable component
    - [x] filter to developers that are only working with Rails or React
        - [x] add reactivity
- [x] Fetch the data of the API response in a context → use a global state instead as workaround
    - [x] Pass the developer names to the LookupBar component
    - [x] display the developer's datas in the table
    - [x] display if the developer is a React and/or a Rails one
- [x] add an esthetic footer
- [x] add a loader during while waiting the request
- [x] set up Vercel for a quick demo

## Improvments

- [x] Adapt the layout for all screen sizes → turns out the table is too big for mobile in portrait
- [ ] Simplify the DeveloperTable component
- [ ] Handle emojis with images (jsx-ally/accessible-emoji)
- [ ] write the types for the module '@huchenme/github-trending';