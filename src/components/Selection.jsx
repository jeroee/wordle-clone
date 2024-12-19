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
                            max={7}
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