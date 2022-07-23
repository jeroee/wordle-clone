import { generateWord } from './RandomWords.js';
import React, { useState, useEffect } from "react";
import WordBoard from './WordBoard.jsx';


function App() {

    const WORD_LENGTH = 5;
    const NUMBER_TRIES = 6;

    const [word, setWord] = useState('');


    useEffect(() => {
        const word = generateWord(WORD_LENGTH);
        setWord(word);
    }, []);

    return (
        <div className="base-page">
            <div className="top">
                <h3>Wordle Clone 🙃 </h3>
                <p>by Jeremy</p>
            </div>
            <WordBoard className="alignment"
                correct_word={word}
                tries={NUMBER_TRIES}
                word_length={WORD_LENGTH}
            />
        </div>

    );
}

export default App;