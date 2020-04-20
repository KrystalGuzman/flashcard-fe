import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const StyledIntroText = styled.p`

    font-weight: bold;

`;

// gets a list of all classes from the database
const FlashcardStatus = () => {

    const [flashcards, setFlashcards] = useState(undefined);

    useEffect(() => {

        axiosWithAuth()
        .get("/flashcards")
        .then(
            response => {

                console.log("Database response:", response.data);
                setFlashcards(response.data);
            }
        )
        .catch(
            response => { console.log("Couldn't get the total number of flashcards from the database.", response); }
        )

    }, []);

    if (flashcards === undefined)
        {
            return (<StyledIntroText>{"Searching for flashcards..."}</StyledIntroText>);
        }
    return (
        <div>
        <StyledIntroText>{flashcards.frontCard}</StyledIntroText>
        <StyledIntroText>{flashcards.backCard}</StyledIntroText>
        </div>
        );
}

export default FlashcardStatus;