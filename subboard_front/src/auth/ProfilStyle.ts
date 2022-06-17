import styled from '@emotion/styled';

export const ProfilContainerStyled = styled.div<{clicked: boolean}>`
    background-color: ${(props) => props.theme.color.primary};
    position: absolute;
    top: ${(props) => (props.clicked ? '50%' : '10px')};
    right: ${(props) => (props.clicked ? '50%' : '10px')};
    transition: all 1s;
    transform: ${(props) => (props.clicked ? 'translate(-50%, -50%)' : '')};
`;

export const ProfilPictureStyled = styled.img<{clicked: boolean}>`
    width: ${(props) => (props.clicked ? '200px' : '50px')};
    height: ${(props) => (props.clicked ? '200px' : '50px')};
    border-radius: 50%;
    transition: all 1s;
`;
