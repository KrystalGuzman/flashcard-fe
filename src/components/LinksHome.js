import React from "react";
import { ImageDiv } from "./styles/ImageDiv";
import { SignupContainer } from "./styles/SignupContainer";
import { FormDiv } from "./styles/FormDiv";
import LoginButton from "./styles/LoginButton";

const LinksHome = () => { 
    return (
        <body id="links-page">
        <SignupContainer>
            <ImageDiv></ImageDiv>
            <FormDiv>
                <h1>Welcome to Education Flashcards!</h1>
                <LoginButton text="Sign up as a client" url="/signup/client"></LoginButton>
                <LoginButton text="Sign up as an instructor" url="/signup/instructor"></LoginButton>
                <LoginButton text="Log in" url="/login"></LoginButton>
            </FormDiv>
        </SignupContainer>
</body>
    )
}

export default LinksHome;