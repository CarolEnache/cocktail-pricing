import styled from 'styled-components/macro';

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    background-color: white;
    padding: 0.25em 1em;
    border-radius: 3px;
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
`;
export default Button;