import { generateWord } from './RandomWords.js';
import React, { useState } from "react";
import WordBoard from './WordBoard.jsx';
import SelectionComponent from './Selection.jsx';
import Button from 'react-bootstrap/Button';

function App() {

    const [word, setWord] = useState('');
    const [isSelectionMade, setIsSelectionMade] = useState(false);
    const [wordLength, setWordLength] = useState(6);
    const [tries, setTries] = useState(5);

    const handleSelection = (selectedSettings) => {
        setWordLength(selectedSettings.wordLength)
        setTries(selectedSettings.tries)
        setWord(generateWord(selectedSettings.wordLength))
        setIsSelectionMade(true);      // Show the WordBoard
    };

    const handleBack = () => {
        setIsSelectionMade(false); // Go back to the SelectionComponent
        window.location.reload(false);
    };

    return (
        <div className="base-page">
            <div className="top">
                <h3>Wordle Clone 🙃 </h3>
                <p>by Jeremy</p>
            </div>
            <div>
                {!isSelectionMade ? (
                    <SelectionComponent word_length_count={wordLength} tries_count={tries} onSelect={handleSelection} />
                ) : (
                    <div>
                        <div className='back-button-div'>
                            <Button onClick={handleBack} className='back-button'>
                                Back
                            </Button>
                        </div>
                        <WordBoard
                            correct_word={word}
                            tries={tries}
                            word_length={wordLength}
                        />
                    </div>
                )}
            </div>

        </div>

    );
}

export default App;