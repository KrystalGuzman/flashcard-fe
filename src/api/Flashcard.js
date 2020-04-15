import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const StyledIntroText = styled.p`

    font-weight: bold;

`;

const Flashcard = () => {

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

    return (<StyledIntroText>
        {"There are " + flashcards + " different flashcards."}
        {flashcards.map(flashcard => flashcard.frontCard)}
    </StyledIntroText>);

}
export default Flashcard;