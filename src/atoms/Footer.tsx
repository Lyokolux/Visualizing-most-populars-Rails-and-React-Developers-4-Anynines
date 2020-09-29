import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer`
    position: absolute;
    box-sizing:  border-box;
    width: 100%;
    background-color: #61DAFB;
    min-height: 5vh;
    bottom: 0;
    margin-bottom: 0;
    padding: 1rem 0 0 1rem;

    @media only screen and (max-width: 968px) {
        display: none;
    }
`

const SpinnerWrapper: React.FC = () => {
    return (
        <StyledFooter>
            <p>Knocked up by Lyokolux with ❤️ for Anynines and to learn React.</p>
            <p>Using <a href="https://github.com/huchenme/github-trending-api">the unofficial github trending API</a> for the datas fetched while the spinner was spinning 😄</p>
        </StyledFooter>
    )
}

export default SpinnerWrapper;