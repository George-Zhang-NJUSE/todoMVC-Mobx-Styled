import styled from 'styled-components';
const checkLogo = require('./checkedCircle.svg');
const circleLogo = require('./emptyCircle.svg');

export const Check = styled.input.attrs({ type: 'checkbox' }) `
    width: 40px;
    height: 40px;
    appearance: none;
    margin-right: 10px;

    &:after {
        content: url(${circleLogo})
    }

    &:checked:after {
        content: url(${checkLogo})
    }
`;