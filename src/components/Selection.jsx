import React, { useState } from "react";
import CounterComponent from "./Counter";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SelectionComponent = ({ word_length_count, tries_count, onSelect }) => {
    const [wordLength, setWordLength] = useState(word_length_count);
    const [tries, setTries] = useState(tries_count);
    const handleConfirm = () => {
        onSelect({ wordLength, tries });
    };

    return (
        <div className="div-card">
            <Card className="selector-card">
                <Card.Body>
                    <div className="instructions">
                        In this Wordle clone game, your goal is to guess the secret word within a limited number of tries.
                        Start the game by entering a valid word of the correct length, and after each guess, you'll receive feedback:
                        🟩 indicates a correct letter in the correct position,
                        🟨 means a correct letter in the wrong position, and
                        ⬜ shows that the letter isn't in the word. Use this feedback to refine your guesses and uncover the secret word.
                        You can choose the word length and the number of attempts at the start of the game.
                        Win by guessing the word within the allotted tries, or lose and see the correct word revealed. Good luck and have fun!
                    </div>
                    <div className="subcard">
                        <Card.Text className="card-letter"> select word length:</Card.Text>
                        <CounterComponent className="counter"
                            value={wordLength}
                            min={4}
                            max={8}
                            onChange={setWordLength} ß
                        />
                    </div>
                    <div className="subcard">
                        <Card.Text className="card-letter" >select number of tries:</Card.Text>
                        <CounterComponent
                            value={tries}
                            min={3}
                            max={8}
                            onChange={setTries}
                        />
                    </div>
                    <div className="subcard">
                        <Button className="play-button" onClick={handleConfirm}>Let's Play!</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SelectionComponent;