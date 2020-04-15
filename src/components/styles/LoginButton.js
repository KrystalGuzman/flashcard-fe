import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import {SignupButton } from "./SignupButton";

const ButtonSeparatorDiv = styled.div`
    margin: 5vh auto;
`;


const LoginButton = ({text, url}) => {

    return (
        
        <ButtonSeparatorDiv>

        <Link to={url}>
            <SignupButton>{text}</SignupButton>
        </Link>

        </ButtonSeparatorDiv>

    )

}

export default LoginButton;