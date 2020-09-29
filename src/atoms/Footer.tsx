import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer`
    position: absolute;
    bottom: 0;
    margin-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding-left: 1rem;
    z-index: -1;
    font-size: 1rem;
    background-color: #61DAFB;
`

const SpinnerWrapper: React.FC = () => {
    return (
        <StyledFooter>
            <p>Made with ❤️ for Anynines and to learn React.</p>
            <p>Using <a href="https://github.com/huchenme/github-trending-api">the unofficial github trending API</a> to retrieve the data, fetched when the spinner was spinning 😄</p>
        </StyledFooter>
    )
}

export default SpinnerWrapper;